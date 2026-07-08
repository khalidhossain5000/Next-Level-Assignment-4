// POST	/api/payments/create	Create a payment intent/session for an approved rental
// POST	/api/payments/confirm	Confirm/verify payment (webhook or callback)
// GET	/api/payments	Get user's payment history
// GET	/api/payments/:id	Get payment details

import { Router } from "express";
import { paymentController } from "./payment.controller";

const router=Router()
//post create payment
router.post("/create",paymentController.createPayment)

//payment confirm ssl
router.post("/confrim",paymentController.paymentConfirm)
//get payment users history
router.get("/",paymentController.getUsersPaymentHistory)
//get payment details
router.get("/:id",paymentController.paymentConfirm)
export const paymentRoutes=router