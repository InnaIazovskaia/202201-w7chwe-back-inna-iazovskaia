require("dotenv").config();
const debug = require("debug")("socialnet:root");
const chalk = require("chalk");
const uppServer = require("./server/uppServer");
const app = require("./server/index");

const port = process.env.PORT || 4000;

(async () => {
  try {
    await uppServer(port, app);
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
