const servicesUser = require("../services/user_services");
class UserController {
  constructor() {}
  async changePassword(req, res, next) {
    try {
      let response = await servicesUser.handleChangePassword(req.body);
      res.json(response);
    } catch (error) {
      console.log("check: ", error);
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      let response = await servicesUser.handleRegister(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
