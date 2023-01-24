module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("User",
        {
            userid: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
            },
            username: { type: Sequelize.STRING(50), unique: true },
            password: { type: Sequelize.STRING(20) },
            confirmpassword: { type: Sequelize.STRING(20) },
            email: { type: Sequelize.STRING(20), unique: true, validate: { isEmail: true } },
        },{
            tablename: "user",
          });
    return user;
}