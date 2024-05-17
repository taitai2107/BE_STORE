const db = require("../models/index");
const hashPass = require("./hashpass");
const ServerError = require("../error/severError");
const Error400 = require("../error/Error400");

class servicesUser {
  constructor() {}

  async handleAddUser({ username, password, email, fullname, phone }) {
    try {
      // const existingEmail = await db.Users.findOne({
      //   where: {
      //     email: email,
      //   },
      // });
      // const existingUserName = await db.Users.findOne({
      //   where: {
      //     userName: username,
      //   },
      // });
      // const existingPhone = await db.Users.findOne({
      //   where: {
      //     phone: phone,
      //   },
      // });
      // let errors = [
      //   existingUserName ? "Username already exists!" : null,
      //   existingEmail ? "Email already exists!" : null,
      //   existingPhone ? "Phone already exists!" : null,
      // ].filter((error) => error !== null);

      // if (errors.length > 0) {
      //   throw new ServerError({
      //     EC: 1,
      //     EM: errors.join(", "),
      //   });
      // }
      // Inside servicesUser class

      if (!this.validatePhone(phone)) {
        throw {
          customError: true,
          EC: 1,
          EM: "Invalid phone number format.",
        };
      }

      const hashPassw = hashPass.hashPassword(password);
      const result = await db.Users.create({
        userName: username,
        passWord: hashPassw,
        email: email,
        fullName: fullname,
        phone: phone,
      });

      if (result) {
        return {
          EC: 0,
          EM: "Account created successfully!",
        };
      }
    } catch (error) {
      console.log("check error:", error);
      this.processError(error);
    }
  }
  async handleDelUser({ id }) {
    const result = await db.Users.findOne({
      where: id,
    });
  }

  validatePhone(phone) {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)([0-9]{8})$/;
    return phoneRegex.test(phone);
  }

  processError(error) {
    let errorCode = 1;
    let errorMsg = "An error occurred while processing your request.";

    if (error.name === "SequelizeUniqueConstraintError") {
      const messages = error.errors
        .map((e) => `${e.path} already exists!`)
        .join(", ");
      errorMsg = messages;
    } else if (error.name === "SequelizeValidationError") {
      errorMsg = error.errors[0].message;
    } else if (error.customError) {
      errorCode = error.EC;
      errorMsg = error.EM;
    }

    throw new ServerError({ EC: errorCode, EM: errorMsg });
  }
}

module.exports = new servicesUser();
