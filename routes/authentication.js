var express = require("express");
var router = express.Router();

/* GET users listing. */

router.post("/register", function (req, res, next) {
  res.send("DIS REGISTER AUTHENTICATION");
});

router.post("/login", function (req, res, next) {
  res.send("DIS LOGIN AUTHENTICATION ");
});

module.exports = router;
