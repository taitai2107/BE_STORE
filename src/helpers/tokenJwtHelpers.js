const jwt = require("jsonwebtoken");

const createToken = (payload, secretKey, expires, cb) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    cb("Failed to create token");
  }
};
module.exports = {
  createToken,
};
