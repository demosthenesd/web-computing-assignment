var express = require("express");
var router = express.Router();

router.get("/volcano/:id", function (req, res, next) {
  if (isNaN(req.params.id)) {
    res.status(404).json({
      error: true,
      message: `Volcano with ID: ${req.params.id} not found.`,
    });
    return;
  }

  req.db
    .from("data")
    .select("*")
    .where("id", "=", req.params.id)
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
