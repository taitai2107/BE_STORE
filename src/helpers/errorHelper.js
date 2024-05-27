const ServerError = require("../error/severError");
const Error400 = require("../error/Error400");

const processError = (error) => {
  let errorCode = 1;
  let errorMsg = error.message;
  let errorStatus = ServerError;

  let errorResponse = {
    EC: errorCode,
    EM: errorMsg,
  };

  if (error.name === "SequelizeUniqueConstraintError") {
    const messages = error.errors
      .map((e) => `${e.path} already exists!`)
      .join(", ");
    errorMsg = messages;
    errorStatus = Error400;
  } else if (error.name === "SequelizeValidationError") {
    errorMsg = error.errors[0].message;
    errorStatus = Error400;
  } else if (error.customError) {
    errorCode = error.EC;
    errorMsg = error.EM;
    errorStatus = Error400;

    if (error.token !== undefined) {
      errorResponse.token = error.token;
    }
  }

  errorResponse.EC = errorCode;
  errorResponse.EM = errorMsg;

  throw new errorStatus(errorResponse);
};
const handleCustomError = (errors) => {
  throw {
    customError: true,
    EC: 1,
    EM: errors.join(", "),
  };
};
const handleCustomErrorToken = (errors) => {
  throw {
    customError: true,
    EC: 1,
    EM: errors.join(", "),
    token: null,
  };
};
module.exports = {
  processError,
  handleCustomError,
  handleCustomErrorToken,
};
