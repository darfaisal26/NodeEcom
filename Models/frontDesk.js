const { poolConnect, sql } = require('../Config/db');

async function getFrontDeskProfiles() {
  await poolConnect;
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        fdp.StaffID,
        fdp.AccessLevel,
        u.UserID,
        u.Name,
        u.Email
      FROM FrontDeskProfiles fdp
      INNER JOIN Users u ON fdp.UserID = u.UserID
    `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getFrontDeskProfiles:', err);
    throw err;
  }
}

async function createFrontDeskProfile({ userId, accessLevel }) {
  await poolConnect;
  try {
    const request = new sql.Request();
    request.input('userId', sql.Int, userId);
    request.input('accessLevel', sql.NVarChar, accessLevel);

    const result = await request.query(`
      INSERT INTO FrontDeskProfiles (UserID, AccessLevel)
      VALUES (@userId, @accessLevel)
    `);
    return result;
  } catch (err) {
    console.error('SQL error in createFrontDeskProfile:', err);
    throw err;
  }
}

module.exports = {
  getFrontDeskProfiles,
  createFrontDeskProfile,
};
