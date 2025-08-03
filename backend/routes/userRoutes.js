import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controller/UserController.js"

let userRoutes = express.Router()

userRoutes.get("/getCurrentuser",isAuth,getCurrentUser)

export default userRoutes