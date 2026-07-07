import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router=Router()
//get public all properties with filter
router.get("/",propertiesController.getAllPropertiesWithFilter)
//get property details public api
router.get("/:id",propertiesController.getPropertyDetails)
export const propertyRoutes=router