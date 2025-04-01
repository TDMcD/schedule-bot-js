const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
// Load environment-specific .env file
dotenv.config({ path: `.env.${env}` });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    // storage: path.join(__dirname, "..", "..", "data", "database.sqlite"),
    logging: false,
  }
);

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
