module.exports = class ServerError extends Error {
  constructor(message) {
    super();
    this.messageObject = message;
    this.status = 500;
  }
};
