// import { Sequelize, Model, DataTypes } from "sequelize";

module.exports = (sequelize, Sequelize) => {
  // const sequelize = new Sequelize();
  const product = sequelize.define(
    "Product",
    {
      productid: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(50) },
      price: { type: Sequelize.DECIMAL(8, 2) },
      quantity: { type: Sequelize.INTEGER(10) },
    },
    {
      tablename: "product",
    }
  )
  return product;
};
