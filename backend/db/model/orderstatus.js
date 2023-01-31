module.exports = (sequelize, Sequelize) => {
    const orderstatus = sequelize.define("Orderstatus", {
        orderstatusid: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true
        },
        status: { type: Sequelize.STRING(15),defaultValue: "In Process" }
    },
        {
            tablename: "orderstatus"
        }
    )
    return orderstatus
}
