const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
async function usersignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/");
}

async function userlogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res
      .status(444)
      .render("login", { error: "Invalid Username Or Password" });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uuid", sessionId);
  return res.redirect("/");
}

module.exports = {
  usersignup,
  userlogin,
};
