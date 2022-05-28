var express = require("express");
var router = express.Router();

router.get("/volcanoes", function (req, res, next) {
  const country = req.query.country;
  const pop = req.query.populatedWithin;

  if (!country) {
    res.status(400).json({
      error: true,
      message: "Country is a required query parameter.",
    });
    return;
  }

  let query = req.db.from("data").select("*").where("country", "=", country);

  if (pop) {
    query = query.where(`population_${pop}`, ">", 0);
  }

  query
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: "Country is a required query parameter.",
      });
    });
});

module.exports = router;
