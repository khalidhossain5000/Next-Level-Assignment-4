

import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router=Router()
//post create payment
router.post("/create",auth(Role.TENANT),paymentController.createPayment)

//payment confirm ssl
router.post("/confirm",paymentController.verifySslCommerzPayment)
//get payment users history
router.get("/",paymentController.getUsersPaymentHistory)
//get payment details
router.get("/:id",paymentController.getPaymentDetails)
export const paymentRoutes=router 