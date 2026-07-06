import { Router } from "express";
import { authController } from "./auth.controller";
const router=Router()
//register user
router.post("/register",authController.registerUser)
//login
router.post("/login",authController.loginUser)
export const authRoutes=router