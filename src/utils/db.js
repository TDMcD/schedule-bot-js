const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "..", "database.sqlite"),
  logging: false,
  host: "localhost",
});

// Define the Poll model
const Poll = sequelize.define(
  "Poll",
  {
    poll_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    day_of_the_week: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channel_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_displayed: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "polls",
    timestamps: false,
  }
);

// sequelize
//   .sync({ force: true })
//   .then(() => console.log("Database & tables created."))
//   .catch((error) => console.error("Error syncing database:", error));

module.exports = {
  sequelize,
  Poll,
};
