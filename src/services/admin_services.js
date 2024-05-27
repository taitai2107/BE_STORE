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

      if (!validatePhone(phone)) {
        handleCustomError(["Invalid phone number format."]); // this ở đây tức là cái class gốc (serviceUser), nói chung là để
        // gọi cái hàm handleCustomError và truyền dối số vào để lấy kết quả thôi
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
          EM: "Account created successfully!",
        };
      }
    } catch (error) {
      console.log("check error:", error);
      processError(error);
    }
  }
  async handleDelUser({ username }) {
    try {
      let errors = [];

      const result = await db.Users.findOne({
        where: { username: username },
      });
      if (!result) {
        errors.push("Username not found !");
      }
      console.log("check erros", errors);
      if (errors.length > 0) {
        handleCustomError(errors);
      }
      await result.destroy();
      return {
        EC: 0,
        EM: "Delete user success !",
      };
    } catch (error) {
      console.log(error);
      // if (error.customError) {
      //   throw new Error400({ EC: error.EC, EM: error.EM });
      // } else {
      //   throw new ServerError({
      //     EC: 1,
      //     EM: "Failed to delete user due to an unexpected error.",
      //   });
      // }
      processError(error);
    }
  }

  async handleUpdate({ userid, email, phone, fullname, password }) {
    try {
      if (!userid) {
        handleCustomError(["Userid is required "]);
      }
      const user = await db.Users.findByPk(userid);
      if (!user) {
        handleCustomError(["UserId not found !"]);
      }

      let updateUser = {};
      const fieldsToUpdate = {
        fullName: fullname,
        email: email,
        phone: phone,
        passWord: password,
      };

      if (phone !== undefined && !validatePhone(phone)) {
        handleCustomError(["Invalid phone number format!"]);
      }
      Object.keys(fieldsToUpdate).forEach((key) => {
        if (fieldsToUpdate[key] !== undefined && fieldsToUpdate[key] !== null) {
          updateUser[key] =
            key === "passWord"
              ? hashPass.hashPassword(fieldsToUpdate[key])
              : fieldsToUpdate[key];
        }
      });
      if (Object.keys(updateUser).length === 0) {
        handleCustomError(["No records have been updated !"]);
      }
      // console.log("check2", fieldsToUpdate);
      // console.log("checl", updateUser);
      const update = await db.Users.update(updateUser, {
        where: { userId: userid },
      });
      if (update > 0) {
        return {
          EC: 0,
          EM: "Update user success !",
        };
      }
    } catch (error) {
      console.log(error);
      processError(error);
    }
  }
}

module.exports = new servicesUser();
