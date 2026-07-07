import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
// GET	/api/admin/users	Get all users
// PATCH	/api/admin/users/:id	Update user status (ban/unban)
// GET	/api/admin/properties	Get all properties
// GET	/api/admin/rentals	Get all rental requests
const router=Router()
//get all users for admin manage
router.get("/users",auth(Role.ADMIN),adminController.getAllUsers)
//update user status for admni
router.patch("/users/:id",auth(Role.ADMIN),adminController.updateUserStatus)
//get all properties for admin
router.get("/properties",auth(Role.ADMIN),adminController.getAllProperties)
//get all rental reqeuest
router.get("/rentals",auth(Role.ADMIN),adminController.getAllRentalRequest)
export const adminRoutes=router