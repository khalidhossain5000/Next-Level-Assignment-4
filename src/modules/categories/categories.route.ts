import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import { categoriesController } from "./categories.controller";

const router=Router()
//admin can create categories
router.post("/",auth(Role.ADMIN),categoriesController.createCategories)
export const categoriesRoutes=router