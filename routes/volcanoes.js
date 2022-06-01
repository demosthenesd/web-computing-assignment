var express = require("express");
var router = express.Router();

router.get("/volcanoes", function (req, res, next) {
  const { country, populatedWithin, ...others } = req.query;
  // const country = req.query.country;
  // const populatedWithin = req.query.populatedWithin;

  if (!country) {
    res.status(400).json({
      error: true,
      message: "Country is a required query parameter.",
    });
    return;
  }

  if (Object.keys(others).length > 0) {
    res.status(400).json({
      error: true,
      message: "Bad Request",
    });
    return;
  }

  let query = req.db.from("data").select("*").where("country", "=", country);
  if (populatedWithin) {
    query = query.where(`population_${populatedWithin}`, ">", 0);
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
