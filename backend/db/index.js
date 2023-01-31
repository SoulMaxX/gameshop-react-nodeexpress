const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'Store',
  'sa',
  'Mm654321',
  {
    host: 'localhost',
    dialect: "mssql"
  }
);
const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.product = require('./model/product')(sequelize, Sequelize);
db.users = require('./model/user')(sequelize, Sequelize);
db.order = require('./model/order')(sequelize, Sequelize);
db.orderitem = require('./model/orderitem')(sequelize, Sequelize);
db.orderstatus = require('./model/orderstatus')(sequelize, Sequelize);

db.users.hasMany(db.order, { foreignKey: {name:'userid',allowNull: false,onDelete: 'CASCADE'} });
db.order.belongsTo(db.users, { foreignKey: 'userid' });
db.order.hasMany(db.orderitem,{ foreignKey: {name:'orderid',allowNull: false,onDelete: 'CASCADE'}});
db.orderitem.belongsTo(db.order,{foreignKey: 'orderid'});
db.product.hasMany(db.orderitem,{foreignKey: {name:'productid',allowNull: false,onDelete: 'CASCADE'}});
db.orderitem.belongsTo(db.product,{foreignKey: 'productid'});
db.order.hasOne(db.orderstatus,{foreignKey: {name:'orderid',allowNull: false,onDelete: 'CASCADE'}})
db.orderstatus.belongsTo(db.order,{foreignKey: {name:'orderid'}})

module.exports = db;