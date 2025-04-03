const { poolConnect, sql } = require("../Config/ConfigDb");

// Fetch all users with their roles
async function getAllUsers() {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query(`
      SELECT 
        u.UserID,
        u.Name,
        u.Email,
        u.ContactInfo,
        u.RoleID,
        r.RoleName,
        u.IqamaNumber,
        u.IqamaExpiry
      FROM Users u
      LEFT JOIN Roles r ON u.RoleID = r.RoleID
    `);
    return result.recordset;
  } catch (err) {
    console.error("SQL error in getAllUsers:", err);
    throw err;
  }
}

// Create a user
// async function createUser({ name, email, password, contactInfo, roleId, iqamaNumber, iqamaExpiry }) {
//   try {
//     const pool = await poolConnect;
//     const request = pool.request();

//     request.input('name', sql.NVarChar, name);
//     request.input('email', sql.NVarChar, email);
//     request.input('password', sql.NVarChar, password);
//     request.input('contactInfo', sql.NVarChar, contactInfo);
//     request.input('roleId', sql.Int, roleId);
//     request.input('iqamaNumber', sql.NVarChar, iqamaNumber);
//     request.input('iqamaExpiry', sql.Date, iqamaExpiry);

//     const result = await request.query(`
//       INSERT INTO Users (Name, Email, Password, ContactInfo, RoleID, IqamaNumber, IqamaExpiry)
//       OUTPUT INSERTED.*
//       VALUES (@name, @email, @password, @contactInfo, @roleId, @iqamaNumber, @iqamaExpiry)
//     `);

//     console.log("New user created in model:", result);
//     return {
//       message: "User created successfully",
//       user: result.recordset[0],
//     };
//   } catch (err) {
//     console.error('SQL error in createUser:', err);
//     throw err;
//   }
// }

// ROLE ID Mapping
const ROLE = {
  CLIENT: 1,
  WORKER: 2,
  DRIVER: 3,
  SYSTEM_ADMIN: 4,
  FRONT_DESK: 5,
};



async function createUser(userData) {
  try {
    const {
      name,
      email,
      password,
      contactInfo,
      roleId,
      iqamaNumber,
      iqamaExpiry,
      address,
      gender,
      maritalStatus,
      livingStatus,
      nationality,
      skillCategory,
      availabilityStatus,
      assignedRoute,
      accessLevel,
    } = userData;

    const pool = await poolConnect;
    const request = pool.request();

    // Insert into Users table
    request.input("name", sql.NVarChar, name);
    request.input("email", sql.NVarChar, email);
    request.input("password", sql.NVarChar, password);
    request.input("contactInfo", sql.NVarChar, contactInfo);
    request.input("roleId", sql.Int, roleId);
    request.input("iqamaNumber", sql.NVarChar, iqamaNumber);
    request.input("iqamaExpiry", sql.Date, iqamaExpiry);

    const userResult = await request.query(`
      INSERT INTO Users (Name, Email, Password, ContactInfo, RoleID, IqamaNumber, IqamaExpiry)
      OUTPUT INSERTED.UserID
      VALUES (@name, @email, @password, @contactInfo, @roleId, @iqamaNumber, @iqamaExpiry)
    `);

    const userId = userResult.recordset[0].UserID;

    let profileInsertQuery = "";
    const profileRequest = pool.request();
    profileRequest.input("userId", sql.Int, userId);

    switch (roleId) {
      case ROLE.CLIENT:
        profileRequest.input("address", sql.NVarChar, address || null);
        profileRequest.input("gender", sql.NVarChar, gender || null);
        profileRequest.input(
          "maritalStatus",
          sql.NVarChar,
          maritalStatus || null
        );
        profileRequest.input(
          "livingStatus",
          sql.NVarChar,
          livingStatus || null
        );

        profileInsertQuery = `
          INSERT INTO ClientProfiles (UserID, Address, Gender, MaritalStatus, LivingStatus)
          VALUES (@userId, @address, @gender, @maritalStatus, @livingStatus)
        `;
        break;

      case ROLE.WORKER:
        profileRequest.input("nationality", sql.NVarChar, nationality || null);
        profileRequest.input(
          "skillCategory",
          sql.NVarChar,
          skillCategory || null
        );
        profileRequest.input(
          "availabilityStatus",
          sql.NVarChar,
          availabilityStatus || null
        );

        profileInsertQuery = `
          INSERT INTO WorkerProfiles (UserID, Nationality, SkillCategory, AvailabilityStatus)
          VALUES (@userId, @nationality, @skillCategory, @availabilityStatus)
        `;
        break;

      case ROLE.DRIVER:
        profileRequest.input(
          "assignedRoute",
          sql.NVarChar,
          assignedRoute || null
        );

        profileInsertQuery = `
          INSERT INTO DriverProfiles (UserID, AssignedRoute)
          VALUES (@userId, @assignedRoute)
        `;
        break;

      case ROLE.SYSTEM_ADMIN:
        profileInsertQuery = `
          INSERT INTO SystemAdminProfiles (UserID)
          VALUES (@userId)
        `;
        break;

      case ROLE.FRONT_DESK:
        profileRequest.input("accessLevel", sql.NVarChar, accessLevel || null);

        profileInsertQuery = `
          INSERT INTO FrontDeskProfiles (UserID, AccessLevel)
          VALUES (@userId, @accessLevel)
        `;
        break;

      default:
        throw new Error("Invalid RoleID");
    }

    if (profileInsertQuery) {
      await profileRequest.query(profileInsertQuery);
    }

    return {
      message: "User and profile created successfully",
      userId,
    };
  } catch (err) {
    console.error("SQL error in createUser:", err);
    throw err;
  }
}

module.exports = {
  createUser,
};

module.exports = {
  getAllUsers,
  createUser,
};
