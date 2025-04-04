const { poolConnect, sql } = require('../Config/db');

async function getDriverProfiles() {
  await poolConnect;
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        dp.DriverID,
        dp.AssignedRoute,
        u.UserID,
        u.Name,
        u.Email
      FROM DriverProfiles dp
      INNER JOIN Users u ON dp.UserID = u.UserID
    `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getDriverProfiles:', err);
    throw err;
  }
}

async function createDriverProfile({ userId, assignedRoute }) {
  await poolConnect;
  try {
    const request = new sql.Request();
    request.input('userId', sql.Int, userId);
    request.input('assignedRoute', sql.NVarChar, assignedRoute);

    const result = await request.query(`
      INSERT INTO DriverProfiles (UserID, AssignedRoute)
      VALUES (@userId, @assignedRoute)
    `);
    return result;
  } catch (err) {
    console.error('SQL error in createDriverProfile:', err);
    throw err;
  }
}

module.exports = {
  getDriverProfiles,
  createDriverProfile,
};
