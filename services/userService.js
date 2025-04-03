const userModel = require('../Models/userModel');

exports.getAllUsers = () => {
  return userModel.getAllUsers();
};

exports.createUser = (data) => {
  return userModel.createUser(data);
};
