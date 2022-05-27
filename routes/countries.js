var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/countries", function (req, res, next) {
  req.db
    .from("data")
    .select("country")
    .orderBy("country")
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        Error: true,
        Message:
          "Invalid query parameters. Query parameters are not permitted.",
      });
    });
});

module.exports = router;
