// Karan Thakkar- importing & initializing routes

const express = require("express");
const app = express();
const error = require("./middlewares/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const db = require("./db-init/dbConn");
const ceo = require("./routes/api/ceo");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(logger("common"));

// write your routes below
app.use("/api/ceo", ceo);
app.use(error);

const port = 5000;

if (process.env.NODE_ENV !== "test") {
  db.connect()
    .then((obj) => {
      app.locals.db = obj;
      obj.done(); // success, release connection;

      app.listen(port, () =>
        console.log(`Server is listening at http://localhost:${port}`)
      );
    })
    .catch((err) => {
      console.log("ERROR:", error.message);
    });
}

module.exports = app;
