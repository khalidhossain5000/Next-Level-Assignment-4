import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";
const router=Router()

router.post("/",auth(Role.TENANT),reviewsController.createReviews)


export const reviewsRoutes=router