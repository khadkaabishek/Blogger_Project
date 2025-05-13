const JWT = require("jsonwebtoken");
const secret = "@bi$hek290";
// const User = require("./../models/user");
function generateToken(User) {
  const payload = {
    _id: User._id,
    full_Name: User.full_Name,
    email: User.email,
    profileImageUrl: User.profileImageUrl,
    role: User.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { generateToken, validateToken };
