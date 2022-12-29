const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'Store',
  'soulmaxx',
  '654321',
  {
    host: 'localhost',
    dialect:"mssql"
  }
);
const db = {};
db.Sequelize= Sequelize
db.sequelize= sequelize

db.product = require('./model/product')(sequelize,Sequelize);

module.exports = db;