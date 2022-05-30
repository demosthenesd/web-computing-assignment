var express = require("express");
var router = express.Router();

var query;

const authorize = function (req, res, next) {
  const auth = req.headers.authorization;

  if (auth) {
    query = req.db.from("data").select("*").where("id", "=", req.params.id);
  } else if (!auth) {
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

  if (auth && auth.split(" ").length !== 2) {
    res.status(401).json({
      Error: true,
      Message: "Invalid JWT token",
    });
    return;
  }

  next();
};
router.get("/volcano/:id", authorize, function (req, res, next) {
  if (isNaN(req.params.id)) {
    res.status(404).json({
      error: true,
      message: `Volcano with ID: ${req.params.id} not found.`,
    });
    return;
  }

  query
    .then((rows) => {
      if (rows.length === 0) {
        res.status(404).json({
          error: true,
          message: `Volcano with ID: ${req.params.id} not found.`,
        });
        return;
      }

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
