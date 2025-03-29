const { sequelize } = require("../../utils/db");
module.exports = (client) => {
  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => console.log("Database & tables created."))
    .catch((error) => console.error("Error syncing database:", error));
};
