const express = require("express");
const { genShortUrl, handleAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/", genShortUrl);

router.get("/analytics/:shortId", handleAnalytics);
module.exports = router;
