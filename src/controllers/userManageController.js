const serviceUser = require("../services/user-manage");
const SeverError = require("../error/severError");
class UserController {
  constructor() {}

  async addUser(req, res, next) {
    try {
      let result = await serviceUser.handleAddUser(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
