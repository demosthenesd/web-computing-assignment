var express = require("express");
var router = express.Router();

router.get("/volcanoes", function (req, res, next) {
  const country = req.query.country;
  const pop = req.query.populatedWithin; // 5

  let query = req.db.from("data").select("*").where("country", "=", country);

  if (pop) {
    query = query.where(`population_${pop}`, ">", 0);
  }
  query
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
