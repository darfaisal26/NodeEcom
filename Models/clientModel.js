// models/clientProfileModel.js
const { poolConnect, sql } = require('../Config/ConfigDb');

// Get client profile along with user info
async function getClientProfiles() {
  await poolConnect;
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        cp.ClientID,
        cp.Address,
        cp.Gender,
        cp.MaritalStatus,
        cp.LivingStatus,
        u.UserID,
        u.Name,
        u.Email,
        u.ContactInfo
      FROM ClientProfiles cp
      INNER JOIN Users u ON cp.UserID = u.UserID
    `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getClientProfiles:', err);
    throw err;
  }
}

// Create a client profile (requires existing UserID)
async function createClientProfile({ userId, address, gender, maritalStatus, livingStatus }) {
  await poolConnect;
  try {
    const request = new sql.Request();
    request.input('userId', sql.Int, userId);
    request.input('address', sql.NVarChar(sql.MAX), address);
    request.input('gender', sql.NVarChar, gender);
    request.input('maritalStatus', sql.NVarChar, maritalStatus);
    request.input('livingStatus', sql.NVarChar, livingStatus);

    const result = await request.query(`
      INSERT INTO ClientProfiles (UserID, Address, Gender, MaritalStatus, LivingStatus)
      VALUES (@userId, @address, @gender, @maritalStatus, @livingStatus)
    `);
    return result;
  } catch (err) {
    console.error('SQL error in createClientProfile:', err);
    throw err;
  }
}

module.exports = {
  getClientProfiles,
  createClientProfile,
};
