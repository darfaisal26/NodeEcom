const { poolConnect, sql } = require('../Config/ConfigDb');

// Get all worker profiles with user info
// async function getWorkerProfiles() {
//   await poolConnect;
//   try {
//     const request = new sql.Request();
//     const result = await request.query(`
//       SELECT 
//         wp.WorkerID,
//         wp.Nationality,
//         wp.SkillCategory,
//         wp.AvailabilityStatus,
//         u.UserID,
//         u.Name,
//         u.Email
//       FROM WorkerProfiles wp
//       INNER JOIN Users u ON wp.UserID = u.UserID
//     `);
//     return result.recordset;
//   } catch (err) {
//     console.error('SQL error in getWorkerProfiles:', err);
//     throw err;
//   }
// }

// Create a new worker profile
// async function createWorkerProfile({ userId, nationality, skillCategory, availabilityStatus }) {
//   await poolConnect;
//   try {
//     const request = new sql.Request();
//     request.input('userId', sql.Int, userId);
//     request.input('nationality', sql.NVarChar, nationality);
//     request.input('skillCategory', sql.NVarChar, skillCategory);
//     request.input('availabilityStatus', sql.NVarChar, availabilityStatus);

//     const result = await request.query(`
//       INSERT INTO WorkerProfiles (UserID, Nationality, SkillCategory, AvailabilityStatus)
//       VALUES (@userId, @nationality, @skillCategory, @availabilityStatus)
//     `);
//     return result;
//   } catch (err) {
//     console.error('SQL error in createWorkerProfile:', err);
//     throw err;
//   }
// }

// Create a new worker profile with Nationality, Skill, and Category validation
async function createWorkerProfile({ UserID, nationality_id, skill_id, category_id, availabilityStatus }) {
  await poolConnect;
  try {
    const request = new sql.Request();
    request.input('UserID', sql.Int, UserID);
    request.input('nationality_id', sql.Int, nationality_id);
    request.input('skill_id', sql.Int, skill_id);
    request.input('category_id', sql.Int, category_id);
    request.input('availabilityStatus', sql.NVarChar, availabilityStatus);

    // Validate if the NationalityID exists
    const nationalityCheck = await request.query(`
      SELECT COUNT(*) AS count FROM Nationalities WHERE nationality_id = @nationality_id
    `);
    if (nationalityCheck.recordset[0].count === 0) {
      throw new Error('Invalid NationalityID');
    }

    // Validate if the SkillID exists
    const skillCheck = await request.query(`
      SELECT COUNT(*) AS count FROM Skills WHERE skill_id = @skill_id
    `);
    if (skillCheck.recordset[0].count === 0) {
      throw new Error('Invalid SkillID');
    }

    // Validate if the CategoryID exists
    const categoryCheck = await request.query(`
      SELECT COUNT(*) AS count FROM Categories WHERE category_id = @category_id
    `);
    if (categoryCheck.recordset[0].count === 0) {
      throw new Error('Invalid CategoryID');
    }

    // Insert into WorkerProfiles if validations pass
    const result = await request.query(`
      INSERT INTO WorkerProfiles (UserID, nationality_id, skill_id,category_id, AvailabilityStatus)
      VALUES (@UserID, @nationality_id, @skill_id, @category_id, @availabilityStatus)
    `);
    
    return result;
  } catch (err) {
    console.error('SQL error in createWorkerProfile:', err);
    throw err;
  }
}


async function getWorkerProfiles() {
  await poolConnect;
  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT 
        wp.WorkerID,
        u.UserID,
        u.Name AS UserName,
        u.Email,
        n.nationality_name,
        s.skill_name,
        c.category_name ,
        wp.AvailabilityStatus
      FROM WorkerProfiles wp
      INNER JOIN Users u ON wp.UserID = u.UserID
      LEFT JOIN Nationalities n ON wp.nationality_id = n.nationality_id
      LEFT JOIN Skills s ON wp.skill_id = s.skill_id
      LEFT JOIN Categories c ON wp.category_id = c.category_id
    `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getWorkerProfiles:', err);
    throw err;
  }
}


module.exports = {
  getWorkerProfiles,
  createWorkerProfile,
};
