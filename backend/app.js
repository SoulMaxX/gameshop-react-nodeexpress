const express = require("express");
const app = express();
const sql = require('mssql');

const data = {
  products: [
    {
      id: "1",
      name: "Ps 5",
      price: 16900,
    },
    {
      id: "2",
      name: "XBOX S",
      price: 6900,
    },
    {
      id: "3",
      name: "NDS",
      price: 8900,
    },
    {
      id: "4",
      name: "PC",
      price: 37000,
    },
  ],
};

const sqlConfig = {

  database: "Store",
  user: "soulmaxx",
  password:"654321",
  server: "localhost",
  driver: "msnodesqlv8",
  
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },
};

const test = new sql.connect(sqlConfig,function(err)
{
  if(err){
    console.log("Error while connecting database: " + err)
  }else{
    // sql.query('SELECT * from Product',(err,result,fields)=>{
    //     console.log(result.recordset)
    // })
    console.log("connected to database: " )
  }
})

// app.use(express.json());
app.use((req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header(
    "access-control-allow-header",
    "origin,X-Requested-With,content-type,accept"
  );
  next();
});

app.get("/", (req, res) => {
  sql.connect(sqlConfig,()=>{
    sql.query('SELECT * from Product',(err,result,fields)=>{
        res.send(result)
    })
    
  })
//   res.send(data);
});

app.listen(4000, () => {
  console.log("run server success");
});
