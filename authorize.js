var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "SUPER SECRET KEY DO NOT STEAL";

//Creates a method for authorization
const authorize = function (req, res, next) {
  const auth = req.headers.authorization;
  let token = "token";

  req.checkAuth = false;

  if (!auth) {
    req.checkAuth = false;
  } else if (auth && auth.split(" ").length !== 2) {
    res.status(401).json({
      error: true,
      message: "Invalid JWT token",
    });
    req.checkAuth = false;
    return;
  }

  if (auth && auth.split(" ")[1]) {
    token = auth.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      req.checkAuth = true;
    }
  }

  next();
};
module.exports = authorize;
