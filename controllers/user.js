const User = require("../models/user");

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
  return res.redirect("/");
}

module.exports = {
  usersignup,
  userlogin,
};
