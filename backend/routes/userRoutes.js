import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getAdmin, getCurrentUser } from "../controller/UserController.js"
import adminAuth from "../middleware/adminAuth.js"

let userRoutes = express.Router()

userRoutes.get("/getCurrentuser",isAuth,getCurrentUser)
userRoutes.get("/getadmin",adminAuth,getAdmin)


export default userRoutes