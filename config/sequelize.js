const { Sequelize } = require("sequelize");
const config = require("./config");
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password, // expected credentials
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection(); // test the connection to ensure connection
module.exports = sequelize;

/*
this is used to connect to sequelize to get database data
*/