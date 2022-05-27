var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/me", function (req, res, next) {
  res.json({ name: "Demosthenes Demecillo", student_number: "n10867384" });
});

module.exports = router;
