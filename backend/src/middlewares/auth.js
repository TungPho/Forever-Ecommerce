const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.headers["x-authorization"];
  if (!token) throw new Error("Not Authorized");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decodedToken.userId;
  next();
};

module.exports = authUser;
