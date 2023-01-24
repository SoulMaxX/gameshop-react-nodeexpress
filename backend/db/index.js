const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'Store',
  'sa',
  'Mm654321',
  {
    host: 'localhost',
    dialect:"mssql"
  }
);
const db = {};
db.Sequelize= Sequelize
db.sequelize= sequelize

db.product = require('./model/product')(sequelize,Sequelize);
db.users = require('./model/user')(sequelize,Sequelize);

module.exports = db;