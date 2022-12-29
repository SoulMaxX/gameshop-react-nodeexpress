const express = require("express");
const app = express();
const sql = require('mssql');

const db = require('./db/index');
const{product} = db;
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
app.use((req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header(
    "access-control-allow-header",
    "origin,X-Requested-With,content-type,accept"
  );
  next();
});

app.get('/product',async(req,res)=>{
  products = await product.findAll()
  // console.log(item)
  res.json(products);
})

// app.get("/", (req, res) => {
//   sql.connect(sqlConfig,()=>{
//     sql.query('SELECT * from Product',(err,result,fields)=>{
//         res.send(result)
//     })
    
//   })
// });

app.listen(4000, () => {
  console.log("run server success");
});
