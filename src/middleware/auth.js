const {
  db,
  hashPass,
  processError,
  handleCustomError,
  handleCustomErrorToken,
  createToken,
  jwt,
  Op,
  where,
} = require("../services/importLib");
const authenticateToken = (req, res, next) => {
  console.log("hello");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user);
    next();
  });
};
let verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) handleCustomError(["Token not found !"]);
    let accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // console.error("JWT Verify Error:", err);
      if (err) {
        handleCustomError(["Token expired or incorrect !"]);
      }
      req.user = user;

      next();
    });
  } catch (error) {
    console.log("check catch :", error);
    processError(error);
  }
};
module.exports = {
  verifyToken,
};
