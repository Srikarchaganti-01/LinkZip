const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectDB } = require("./connection");
const app = express();
const port = 8001;

connectDB("mongodb://localhost:27017/linkzip").then(
  console.log("mongoDb Connected"),
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        history: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.orgId);
});

app.listen(port, () => console.log(`server Started on port ${port}`));
