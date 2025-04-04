
const { poolConnect, sql } = require('../Config/db');

async function getAllRoles() {
  try {
    const pool = await poolConnect;
    const request = pool.request(); 
    const result = await request.query(`SELECT RoleID, RoleName FROM Roles`);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getAllRoles:', err);
    throw err;
  }
}


module.exports = {
    getAllRoles,
};
