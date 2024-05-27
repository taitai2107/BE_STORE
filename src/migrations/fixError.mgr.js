// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addConstraint("Users", {
//       fields: ["userName", "email", "phone"],
//       type: "unique",
//       name: "unique_username_email_phone_constraint",
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeConstraint(
//       "Users",
//       "unique_username_email_phone_constraint"
//     );
//   },
// };

"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo ràng buộc unique riêng lẻ cho mỗi trường
    await queryInterface.addConstraint("Users", {
      fields: ["userName"],
      type: "unique",
      name: "unique_userName_constraint",
    });
    await queryInterface.addConstraint("Users", {
      fields: ["email"],
      type: "unique",
      name: "unique_email_constraint",
    });
    await queryInterface.addConstraint("Users", {
      fields: ["phone"],
      type: "unique",
      name: "unique_phone_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    // Loại bỏ ràng buộc unique riêng lẻ khi rollback
    await queryInterface.removeConstraint(
      "Users",
      "unique_userName_constraint"
    );
    await queryInterface.removeConstraint("Users", "unique_email_constraint");
    await queryInterface.removeConstraint("Users", "unique_phone_constraint");
  },
};
