var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/me", function (req, res, next) {
  res.send("DIS ME YO");
});

module.exports = router;
