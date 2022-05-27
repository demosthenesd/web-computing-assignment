var express = require("express");
var router = express.Router();

router.get("/volcano/:id", function (req, res, next) {
  req.db
    .from("data")
    .select("*")
    .where("id", "=", req.params.id)
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
