const authApi = require("./auth");
const errorHandler = require("../middleware/baseError");
const useRouter = (app) => {
  app.use("/api/v1", authApi);
  app.use(errorHandler);
};
module.exports = {
  useRouter,
};
