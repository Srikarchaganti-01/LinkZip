const { getUser } = require("../services/auth");

async function restrictAccess(req, res, next) {
  const userUid = req.cookies?.uuid;

  if (!userUid) return res.status(400).redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.status(400).redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restrictAccess,
};
