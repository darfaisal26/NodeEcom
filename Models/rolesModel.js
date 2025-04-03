const { getAllRoles } = require('../Models/rolesModel');

const fetchRoles = async () => {
  const roles = await getAllRoles();
  return roles;
};
module.exports = { fetchRoles };