import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router=Router()
//get public all properties with filter
router.get("/",propertiesController.getAllPropertiesWithFilter)
export const propertyRoutes=router