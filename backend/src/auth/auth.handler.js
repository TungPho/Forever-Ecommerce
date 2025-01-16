const jwt = require("jsonwebtoken");

createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  createToken,
};
