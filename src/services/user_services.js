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
  validatePhone,
} = require("./importLib");
class servicesUser {
  constructor() {}
  async handleChangePassword({ userid, currentpassword, newpassword }) {
    try {
      if (!userid) {
        handleCustomError([`Userid is required !`]);
      }
      const user = await db.Users.findByPk(userid);
      const isMatch = hashPass.checkPassword(currentpassword, user.passWord);
      if (!isMatch) {
        handleCustomError([`Current password is incorrect !`]);
      }
      if (currentpassword === newpassword) {
        handleCustomError([
          "Your new password cannot be the same as your old password",
        ]);
      }
      const newHashPassword = hashPass.hashPassword(newpassword);

      const change = await db.Users.update(
        { passWord: newHashPassword },
        {
          where: { userId: userid },
        }
      );

      if (change[0] === 0) {
        handleCustomError([
          "Your new password cannot be the same as your old password",
        ]);
      }

      return {
        EC: 0,
        EM: "Change password success!",
      };
    } catch (error) {
      console.log(error);
      processError(error);
    }
  }
  async handleRegister({ username, password, email, fullname, phone }) {
    try {
      let fielErrors = {
        username: "Username is missing!",
        password: "Password is missing!",
        email: "Email is missing!",
        phone: "phone is missing!",
      };
      const errors = [];
      const fields = { username, password, email, phone };
      Object.keys(fielErrors).forEach((field) => {
        if (!fields[field]) {
          errors.push(fielErrors[field]);
        }
      });

      if (!validatePhone(phone)) {
        handleCustomError(["Invalid phone number format."]);
      }
      console.log(errors);
      if (errors.length > 0) {
        handleCustomError(errors);
      }
      const hashPassw = hashPass.hashPassword(password);
      const result = await db.Users.create({
        userName: username,
        passWord: hashPassw,
        email: email,
        fullName: fullname,
        phone: phone,
        role: 2,
      });

      if (result) {
        return {
          EC: 0,
          EM: "Account register successfully!",
        };
      }
    } catch (error) {
      console.log("check error:", error);
      processError(error);
    }
  }
}
module.exports = new servicesUser();
