var express = require("express");
var router = express.Router();
var auth = require("../authorize");

/* GET users listing. */

var queryUsers;

router.get("/:email/profile", auth, function (req, res, next) {
  if (!req.checkAuth) {
    queryUsers = req.db
      .from("users")
      .select("email", "firstName", "lastName")
      .where("email", "=", req.params.email);
  } else {
    queryUsers = req.db
      .from("users")
      .select("email", "firstName", "lastName", "dob", "address")
      .where("email", "=", req.params.email);
  }
  console.log(req.params.email);

  queryUsers.then((users) => {
    if (users.length === 0) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.json(users[0]);
  });
});

router.put("/:email/profile", function (req, res, next) {});
module.exports = router;
