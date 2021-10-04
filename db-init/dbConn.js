var options = {
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message);
    }
  },
};

const pg = require("pg-promise")(options);
const config = require("config");
const ceoURL = config.get("ceoURL");
const db = pg(ceoURL);

module.exports = db;
