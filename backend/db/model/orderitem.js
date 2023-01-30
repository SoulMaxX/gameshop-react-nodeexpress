

module.exports = (sequelize, Sequelize) => {

    const orderitem = sequelize.define("Orderitem", {
        orderitemid: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true
        },
        qty: { type: Sequelize.INTEGER(10) },
    },
        {
            tablename: "orderitem",
        }
    );
    return orderitem;
}

