var express = require("express");
var router = express.Router();

router.get("/volcanoes", function (req, res, next) {
  res.send("DIS VOLCANO");
});

module.exports = router;
