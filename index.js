const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const { connectDB } = require("./connection");
const app = express();
const port = 8001;

connectDB("mongodb://localhost:27017/linkzip").then(
  console.log("mongoDb Connected"),
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
