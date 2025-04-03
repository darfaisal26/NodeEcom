const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createUser = async (req, res) => {
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
    } = req.body;

    // console.log(req.body);
    // Validate common required fields
    if (!name || !email || !password || !roleId) {
      return res.status(400).json({
        error:
          "Missing required user fields: name, email, password, or roleId.",
      });
    }

    // Role-based required field validation
    switch (roleId) {
      case 1: // Client
        if (!address || !gender || !maritalStatus || !livingStatus) {
          return res.status(400).json({
            error:
              "Client must provide address, gender, maritalStatus, and livingStatus.",
          });
        }
        break;

      case 2: // Worker
        if (!nationality || !skillCategory || !availabilityStatus) {
          return res.status(400).json({
            error:
              "Worker must provide nationality, skillCategory, and availabilityStatus.",
          });
        }
        break;

      case 3: // Driver
        if (!assignedRoute) {
          return res
            .status(400)
            .json({ error: "Driver must provide assignedRoute." });
        }
        break;

      case 4: // FrontDesk
        if (!accessLevel) {
          return res
            .status(400)
            .json({ error: "FrontDesk must provide accessLevel." });
        }
        break;

      case 5: // Admin
        // Admin has no extra required fields
        break;

      default:
        return res.status(400).json({ error: "Invalid roleId" });
    }

    // Pass the full payload to service (including nulls)
    const newUser = await userService.createUser({
      name,
      email,
      password,
      contactInfo,
      roleId,
      iqamaNumber,
      iqamaExpiry,
      address: address || null,
      gender: gender || null,
      maritalStatus: maritalStatus || null,
      livingStatus: livingStatus || null,
      nationality: nationality || null,
      skillCategory: skillCategory || null,
      availabilityStatus: availabilityStatus || null,
      assignedRoute: assignedRoute || null,
      accessLevel: accessLevel || null,
    });

    // console.log("New user created:", newUser);
    return res.status(201).json(newUser);
  } catch (err) {
    // console.error("Error in createUser:", err);
    res.status(500).json({ error: err.message });
  }
};
