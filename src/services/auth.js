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
} = require("./importLib");
class servicesAuth {
  constructor() {}
  async handleLogin({ valueInput, password }) {
    // console.log("Received Value Input:", valueInput);
    // console.log("Received Password:", password);
    console.log(password);
    try {
      let account = await db.Users.findOne({
        where: {
          [Op.or]: [{ email: valueInput }, { userName: valueInput }],
        },
      });
      if (!account) {
        handleCustomErrorToken(["Account not found !"]);
      }
      let payload = {
        id: account.dataValues.userId,
        // username: account.dataValues.username,
        // groupId: account.dataValues.groupId,
        // group: account.dataValues.group,
      };
      let secretkey = process.env.ACCESS_TOKEN_SECRET;
      let expires = "1d";
      let token = createToken(payload, secretkey, expires, handleCustomError);
      token = "Bearer " + token;
      const data = {
        accountId: account.userId,
        userName: account.userName,
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        roleId: account.role,
      };
      if (hashPass.checkPassword(password, account.passWord)) {
        return {
          EC: 0,
          EM: "Đăng nhập thành công",
          // data: data,
          token: token,
        };
      } else {
        handleCustomErrorToken(["password error !"]);
      }
    } catch (error) {
      console.log("check e", error);
      processError(error);
    }
  }
  async handleFindUser(id) {
    try {
      const res = await db.Users.findByPk(id);

      return {
        EC: 0,
        EM: res,
      };
    } catch (error) {
      processError(error);
    }
  }
}
module.exports = new servicesAuth();
