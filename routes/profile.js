var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/:email/profile", function (req, res, next) {
  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", req.params.email);

  queryUsers.then((users) => {
    if (users.length === 0) {
      res.status(401).json({
        error: true,
        message: "Incorrect email or password",
      });
      return;
    }
    res.json(users);
  });
});

router.put("/:email/profile", function (req, res, next) {
  res.send("DIS REGISTER");
});
module.exports = router;
