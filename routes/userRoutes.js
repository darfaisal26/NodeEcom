const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/** @swagger
* /users/createUsers:
*   post:
*     summary: Create a new user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - email
*               - password
*               - roleId
*             properties:
*               name:
*                 type: string
*               email:
*                 type: string
*               password:
*                 type: string
*               contactInfo:
*                 type: string
*               roleId:
*                 type: integer
*                 description: Role ID (1=Client, 2=Worker, 3=Driver, 4=System Admin, 5=Front Desk)
*               iqamaNumber:
*                 type: string
*               iqamaExpiry:
*                 type: string
*                 format: date
*               address:
*                 type: string
*               gender:
*                 type: string
*               maritalStatus:
*                 type: string
*               livingStatus:
*                 type: string
*               nationality:
*                 type: string
*               skillCategory:
*                 type: string
*               availabilityStatus:
*                 type: string
*               assignedRoute:
*                 type: string
*               accessLevel:
*                 type: string
*     responses:
*       201:
*         description: User created successfully
*       400:
*         description: Invalid input
*       500:
*         description: Server error
*/


router.get("/getUsers", userController.getAllUsers);
router.post("/createUsers", userController.createUser);

module.exports = router;
