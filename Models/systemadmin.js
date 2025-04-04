const { poolConnect, sql } = require('../Config/db');

async function getSystemAdminProfiles() {
  await poolConnect;
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        sap.AdminID,
        u.UserID,
        u.Name,
        u.Email
      FROM SystemAdminProfiles sap
      INNER JOIN Users u ON sap.UserID = u.UserID
    `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getSystemAdminProfiles:', err);
    throw err;
  }
}

async function createSystemAdminProfile(userId) {
  await poolConnect;
  try {
    const request = new sql.Request();
    request.input('userId', sql.Int, userId);

    const result = await request.query(`
      INSERT INTO SystemAdminProfiles (UserID)
      VALUES (@userId)
    `);
    return result;
  } catch (err) {
    console.error('SQL error in createSystemAdminProfile:', err);
    throw err;
  }
}

module.exports = {
  getSystemAdminProfiles,
  createSystemAdminProfile,
};
