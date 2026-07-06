import { Router } from "express";
import { propertyController } from "./properties.controller";
import auth from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router=Router()
//create properteis by landlord
router.post("/properties",auth(Role.LANDLORD),propertyController.createProperties)
export const propertyRoutes=router