import express from 'express';
import { deleteUser, readAllUsers, readUniqueUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send("Hello user, you are logged in")
})
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in and you can delete your account!")
})
router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in and you can delete all accounts!")
})
router.get("/", verifyAdmin, readAllUsers);
router.get("/:id", verifyUser, readUniqueUser);
router.put("/:id", verifyUser, updateUser);
router.get("/:id", verifyUser, deleteUser);


export default router; 