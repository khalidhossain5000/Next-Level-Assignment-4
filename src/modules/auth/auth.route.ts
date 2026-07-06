import { Router } from "express";
import { authController } from "./auth.controller";
const router=Router()
//register user
router.post("/register",authController.registerUser)

export const authRoutes=router