const cors = require("cors");
const configCORS = (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};
module.exports = {
  configCORS,
};
