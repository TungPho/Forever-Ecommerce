const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  // get the access token from headers -> req.headers[x-authorization]
  // khi nao access token het han, yeu cau dang nhap lai, su dung refreshtoken de cap lai a pair of tokens
  // remember the publickey and secret key ?
  console.log("END point reached 1");

  const accessToken = req.headers["x-authorization"];
  if (!accessToken) throw new Error("Error");
  const admin = jwt.verify(accessToken, process.env.JWT_SECRET);
  if (admin !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    throw new Error("Not Authorized Login");
  }
  next();
};
module.exports = adminAuth;
