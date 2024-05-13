const authApi = require("./auth");
const useRouter = (app) => {
  app.use("api/v1", authApi);
  app.use("/", (req, res) => {
    res.send("ok");
  });
};
module.exports = {
  useRouter,
};
