var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", function (req, res, next) {
  res.send("DIS REGISTER AUTHENTICATION");
});

router.get("/login", function (req, res, next) {
  res.send("DIS LOGIN AUTHENTICATION ");
});

module.exports = router;
