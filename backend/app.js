const express = require("express");
const app = express();
const sql = require('mssql');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const db = require('./db/index');
const { where } = require("sequelize");
const { product, users, order, orderitem, orderstatus } = db;
db.sequelize.sync();

let salt = bcrypt.genSaltSync(10);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

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
  res.header("Access-Control-Allow-Methods", " PUT, DELETE");
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

app.get('/product/find', async (req, res) => {
  const productid = req.query.productid
  products = await product.findOne({ where: { productid: productid } })
  // console.log(item)
  res.json(products);
})

app.post('/product/create', async (req, res) => {
  const item = await product.create(req.body)
  res.json(item)
})

app.put('/product/edit', async (req, res) => {
  const productid = req.query.productid
  const item = await product.update(req.body, { where: { productid: productid } })
  res.json(item)

})
app.put('/product/editqty', async (req, res) => {
  // const productid = req.query.productid
  const data = req.body
  for (let index = 0; index < data.cart.length; index++) {
    const productid = data.cart[index].productid;
    const qty = data.cart[index].quantity-data.cart[index].qty;
    
    const item = await product.update({quantity: qty}, { where: { productid: productid } })
  }
  res.send('update')

})


app.delete('/product/delete', async (req, res) => {
  const productid = req.query.productid
  const item = await product.destroy({ where: { productid: productid } })
  res.send({ delete: productid })

})

app.get('/image/:name',(req,res)=>{
  const image = req.params.name
  res.sendFile(__dirname+"/uploads/"+image)
})

app.post('/upload',upload.single('file'),(req,res)=>{
  res.send(req.file)
})

app.post('/register', async (req, res) => {
  if (req.body.password === req.body.confirmpassword) {
    // let user = await users.create(req.body)
    let hash = bcrypt.hashSync(req.body.password, salt)
    let user = await users.create({
      username: req.body.username,
      password: hash,
      // confirmpassword: req.body.confirmpassword,
      email: req.body.email
    })
    // let result = await user.save()
    delete user.dataValues.password
    // delete user.dataValues.confirmpassword
    res.send(user)
  } else {
    res.send('password not match')
  }
})

app.delete('/register/delete/:userid', async (req, res) => {
  let param = req.params.userid
  let user = await users.destroy({ where: { userid: param } })
  res.send({ delete: param })
})

app.post('/login', async (req, res) => {
  // res.send(req.body)
  if (req.body.username && req.body.password) {
    const user = await users.findOne({ where: { username: req.body.username }, attributes: { exclude: ['confirmpassword'] } });
    // console.log(pass)
    if (user) {
      const pass = bcrypt.compareSync(req.body.password, user.password);
      if (pass === true) {
        res.send(user)
      } else {
        res.send({ result: ' Password incorrect ' })

      }
    } else {
      res.send({ result: ' Not User Found ' })
    }
  } else {
    res.send({ result: ' require username ,password ' })
  }
})

app.get('/order', async (req, res) => {
  let param = req.query.userid
  const orders = await order.findAll({ where: { userid: param } })
  res.json(orders)
})

app.get('/orderdetail', async (req, res) => {
  let paramorder = req.query.orderid
  const orders = await order.findOne({ where: { orderid: paramorder }, include: { all: true, nested: true, attributes: { exclude: ['password', 'confirmpassword'] } } })
  res.json(orders)
})


app.post('/order', async (req, res) => {


  let data = req.body
  let orders = await order.create({
    fullname: data.order.fullname,
    address: data.order.address,
    phone: data.order.phone,
    totalprice: data.total,
    userid: data.userid,
  })
  let result = await orders.save()
  // res.send(result)
  // console.log(data.cart[0].productid)
  for (let index = 0; index < data.cart.length; index++) {
    const productid = data.cart[index].productid;
    const qty = data.cart[index].qty;
    console.log(productid)
    let orderitems = await orderitem.create({
      productid: productid,
      qty: qty,
      orderid: result.orderid
    })

    // let resultorder = await orderitems.save()
  }
  let status = await orderstatus.create({
    orderid: result.orderid
  })
  res.json(result)

})

app.listen(4000, () => {
  console.log("run server success");
});
