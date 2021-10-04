// Karan Thakkar - API for ceo

// required imports
const express = require("express");
const db = require("../../db-init/dbConn");
const router = express.Router();
const { authToken } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/admin");

// GET API
// return success code 200 and a message "Record fetched successfully" if alteast one record is present in database
// return error code 400 and a message "No records found!" if there's no entry in database
router.get("/", async (req, res, next) => {
  try {
    const result = await db.any(`select * from ceo`);
    if (result.length < 1) {
      return res.status(400).json({
        message: "No records found!",
      });
    } else {
      return res.status(200).json({
        data: result,
        message: "Record fetched successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});

// POST API
// return success code 200 and a message "CEO added successfully" if name,company_name,salary,globalrank,status is provided in the body
// return an error code of 400 and a message "Record already exists cannot add!" if name already exists in database
// return an error code of 400 and a message "All fields required!" if name,company_name,salary,globalrank,email any one of them is not provided in the request
router.post("/addCEO", async (req, res, next) => {
  try {
    const { name, companyName, salary, globalrank, email } = req.body;
    const alreadyExists = await db.any(
      `select * from ceo where email='${email}'`
    );

    if (alreadyExists.length > 0) {
      return res.status(400).json({
        message: "Record already exists cannot add!",
      });
    }
    if (Object.keys(req.body).length < 5) {
      return res.status(400).json({
        message: "All fields required!",
      });
    }

    const result = await db.one(
      `insert into ceo(name,company_name,salary,globalrank,email) values('${name}', '${companyName}',${salary},${globalrank},'${email}') returning ceo_id`
    );
    return res.status(200).json({
      data: result,
      message: "CEO added successfully",
    });
  } catch (error) {
    next(error);
  }
});

// PUT API
// return an error code of 400 and a message "All fields required!" if name,salary any of one is not provided in the request
// return an success code of 200 and a message "CEO updated successfully" if name,salary is provided in the request
router.put("/updateCEO", async (req, res, next) => {
  try {
    const { email, salary } = await req.body;
    if (Object.keys(req.body).length < 2) {
      return res.status(400).json({
        message: "All fields required!",
      });
    }
    const result = await db.any(
      `update ceo set salary=${salary} where email='${email}' `
    );
    return res.status(200).json({
      message: "CEO updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
