// import { Sequelize, Model, DataTypes } from "sequelize";


module.exports = (sequelize, Sequelize) => {
    // const sequelize = new Sequelize();

    const order = sequelize.define("Order", {
        orderid: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true
        },
        fullname: { type: Sequelize.STRING(50) },
        address: { type: Sequelize.STRING(50) },
        phone: { type: Sequelize.INTEGER(10) },
        totalprice: { type: Sequelize.INTEGER(10) },
    },
        {
            tablename: "order",
        }
    );
    return order
};

