var express = require("express");
var router = express.Router();
var auth = require("../authorize");
const { DateTime } = require("luxon");

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
  const dobToDate = new Date(req.body.dob);
  const month = dobToDate.getMonth();
  const year = dobToDate.getFullYear();
  const day = dobToDate.getDate();
  const dob = year + "-" + month + "-" + day;
  const currentDate = new Date();
  const address = req.body.address;

  console.log(dob);
  console.log(currentDate);

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

  let lettersOnly = /^[A-Za-z]+$/;
  let dateFormat = /^\d{4}-\d{2}-\d{2}$/;

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

  if (dobToDate > currentDate) {
    res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a date in the past.",
    });
    return;
  } else if (!dateFormat.test(dob)) {
    res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a real date in format YYYY-MM-DD.",
    });
    return;
  }

  const query = req.db
    .from("users")
    .update(
      { firstName: firstName },
      { lastName: lastName },
      { dob: dob },
      { address: address }
    )
    .where({ email: req.params.email });

  if (req.checkAuth)
    query.then(() =>
      res
        .status(200)
        .json({ email: req.body.email, firstName, lastName, dob, address })
    );
});

module.exports = router;
