var express = require("express");
var router = express.Router();

var auth = require("../authorize");

var query;

router.get("/volcano/:id", auth, function (req, res, next) {
  if (isNaN(req.params.id)) {
    res.status(400).json({
      error: true,
      message: "Invalid query parameters. Query parameters are not permitted.",
    });
    return;
  }

  if (req.checkAuth) {
    query = req.db.from("data").select("*").where("id", "=", req.params.id);
  } else {
    query = req.db
      .from("data")
      .select(
        "id",
        "name",
        "country",
        "region",
        "subregion",
        "last_eruption",
        "summit",
        "elevation",
        "latitude",
        "longitude"
      )
      .where("id", "=", req.params.id);
  }

  query.then((rows) => {
    if (!rows.length) {
      res.status(404).json({
        error: true,
        message: `Volcano with ID: ${req.params.id} not found.`,
      });
      return;
    }

    res.json(rows[0]);
  });
});

module.exports = router;
