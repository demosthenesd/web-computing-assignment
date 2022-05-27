var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:email/profile", function (req, res, next) {
  res.send("DIS REGISTER");
});

router.get("/:email/profile", function (req, res, next) {
  res.send("DIS REGISTER");
});
module.exports = router;
