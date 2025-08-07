import express from "express";
import { googleLogin, login, logOut, registration, adminLogin} from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration",registration);
authRoutes.post("/login",login);
authRoutes.get("/logOut",logOut);
authRoutes.post("/googlelogin",googleLogin);
authRoutes.post("/adminlogin",adminLogin);

export default authRoutes;