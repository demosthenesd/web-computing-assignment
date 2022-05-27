var express = require("express");
var router = express.Router();

const id = 1;

/* GET users listing. */
router.get("/countries", function (req, res, next) {
  req.db
    .from("data")
    .select("name")
    .then((rows) => {
      res.json({ Error: false, Message: "Success", name: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error in MySQL query" });
    });
});

router.get("/volcano", function (req, res, next) {
  res.send("DIS VOLCANO");
});

router.get(`/volcano/${id}`, function (req, res, next) {
  res.send("DIS VOLCANO WITH ID ");
});

module.exports = router;
