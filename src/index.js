require("dotenv").config();
const debug = require("debug")("socialnet:root");
const chalk = require("chalk");
const uppServer = require("./server/uppServer");
const app = require("./server/index");
const databaseConnect = require("./database");

const port = process.env.PORT || 4000;
const connectionString = process.env.MONGO_CONNECT;

(async () => {
  try {
    await databaseConnect(connectionString);
    await uppServer(port, app);
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
