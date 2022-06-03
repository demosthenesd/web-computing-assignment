var express = require("express");
var router = express.Router();
var auth = require("../authorize");
var moment = require("moment");

/* GET users listing. */

var queryUsers;

router.get("/:email/profile", auth, function (req, res, next) {
  if (
    !req.checkAuth ||
    (req.checkAuth && req.params.email !== req.decoded.email)
  ) {
    queryUsers = req.db
      .from("users")
      .select("email", "firstName", "lastName")
      .where("email", "=", req.params.email);
  } else {
    queryUsers = req.db
      .from("users")
      .select("email", "firstName", "lastName", "dob", "address")
      .where("email", "=", req.params.email);
  }

  queryUsers.then((users) => {
    if (users.length === 0) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }

    res.json(users[0]);
  });
});

router.put("/:email/profile", auth, function (req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const address = req.body.address;
  const now = moment();
  let dob = moment(req.body.dob, "YYYY-MM-DD", true);

  const lettersOnly = /^[A-Za-z]+$/;
  const dateFormat = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;

  if (!firstName || !lastName || !dob || !address) {
    res.status(400).json({
      error: true,
      message:
        "Request body incomplete: firstName, lastName, dob and address are required.",
    });
    return;
  } else if (
    !lettersOnly.test(firstName) ||
    !lettersOnly.test(lastName) ||
    typeof address !== "string"
  ) {
    res.status(400).json({
      error: true,
      message:
        "Request body invalid: firstName, lastName and address must be strings only.",
    });
    return;
  }

  if (dob > now) {
    res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a date in the past.",
    });
    return;
  } else if (!dob.isValid()) {
    res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a real date in format YYYY-MM-DD.",
    });
    return;
  }
  dobISOFormat = dob.format("YYYY-MM-DD");
  if (!dateFormat.test(dobISOFormat)) {
    res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a real date in format YYYY-MM-DD.",
    });
    return;
  }

  if (!req.checkAuth) {
    res.status(401).json({
      error: true,
      message: "Authorization header ('Bearer token') not found",
    });
    return;
  } else if (req.checkAuth && req.decoded.email !== req.params.email) {
    res.status(403).json({
      error: true,
      message: "Forbidden",
    });
    return;
  }

  console.log(dobISOFormat);

  const query = req.db
    .from("users")
    .update({
      firstName: firstName,
      lastName: lastName,
      dob: dobISOFormat,
      address: address,
    })
    .where({ email: req.decoded.email });

  if (req.checkAuth) {
    query.then(() =>
      res.status(200).json({
        email: req.params.email,
        firstName,
        lastName,
        dob: dobISOFormat,
        address,
      })
    );
  }
});

module.exports = router;
