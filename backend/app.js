const express = require("express");
const app = express();
const sql = require('mssql');
const cookieSession = require('cookie-session');

const db = require('./db/index');
const { product, users } = db;
db.sequelize.sync();



// const sqlConfig = {

//   database: "Store",
//   user: "soulmaxx",
//   password:"654321",
//   server: "localhost",
//   driver: "msnodesqlv8",

//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true
//   },
// };

// const test = new sql.connect(sqlConfig,function(err)
// {
//   if(err){
//     console.log("Error while connecting database: " + err)
//   }else{
//     console.log("connected to database: " )
//   }
// })

app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600 * 1000
}))


app.use((req, res, next) => {
  res.header("access-control-allow-origin", "*");
  // res.header("access-control-allow-method", "*");
  res.header(
    "access-control-allow-headers",
    "origin,X-Requested-With,content-type,accept,Authorization"
  );
  next();
});

const ifNotlogin = (req, res, next) => {
  if (!req.session.isLogin) {

    return res.redirect('/login')
  }
  next()
}
app.get('/product', async (req, res) => {
  products = await product.findAll()
  // console.log(item)
  res.json(products);
})

app.post('/register', async (req, res) => {
  if(req.body.password === req.body.confirmpassword){
    let user = await users.create(req.body)
    let result = await user.save()
    delete result.dataValues.password
    delete result.dataValues.confirmpassword
    res.send(result)
  }else{
    res.send('password not match')
  }
})

app.post('/login', async (req, res) => {
  // res.send(req.body)
  if (req.body.username && req.body.password) {
    const user = await users.findOne({ where: { username: req.body.username },attributes: { exclude: ['confirmpassword'] }});
    if (user) {
      // res.send(user)
      if (user.password == req.body.password) {
        res.send(user)
      }else{
      res.send({ result: ' Password incorrect ' })

      }
    } else {
      res.send({ result: ' Not User Found ' })
    }
  } else {
    res.send({ result: ' require username ,password ' })
  }
})

app.listen(4000, () => {
  console.log("run server success");
});
