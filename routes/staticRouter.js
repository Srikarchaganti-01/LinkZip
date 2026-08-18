const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allURLs = await URL.find({});
  return res.status(200).render("home", { urls: allURLs });
});

router.get("/signup", (req, res) => {
  return res.status(200).render("signup");
});

router.get("/login", (req, res) => {
  return res.status(200).render("login");
});

module.exports = router;
