const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function genShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res
      .status(400)
      .json({ error: "url that has to be shortened has to be provided" });
  }
  const shortId = nanoid(10);

  await URL.create({
    shortId: shortId,
    orgId: body.url,
    history: [],
  });
  return res.status(200).render("home", { id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(200).json({
    TotalVisits: result.history.length,
    Analytics: result.history,
  });
}

module.exports = {
  genShortUrl,
  handleAnalytics,
};
