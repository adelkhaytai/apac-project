import express from "express"
import { authorizeRoles, isAuthinticator } from "../middlewares/auth.js"
import {  getUserProfile, loginUser, logoutUser, registerUser,  updateUserProfile } from "../controllers/authControllers.js"
const router = express.Router()



router.post("/register", registerUser)

router.post("/login", loginUser)
router.get("/logout" , logoutUser )


router.get("/profile",isAuthinticator,getUserProfile)
router.put("/profile/update" , isAuthinticator, updateUserProfile)




export default router