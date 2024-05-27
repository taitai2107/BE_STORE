const validatePhone = (phone) => {
  const phoneRegex = /^(0|\+84)(3|5|7|8|9)([0-9]{8})$/;
  return phoneRegex.test(phone);
};
module.exports = {
  validatePhone,
};
