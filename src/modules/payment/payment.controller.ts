// POST	/api/payments/create	Create a payment intent/session for an approved rental
// POST	/api/payments/confirm	Confirm/verify payment (webhook or callback)
// GET	/api/payments	Get user's payment history
// GET	/api/payments/:id	Get payment details

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpsStatus from "http-status";
import { paymentServices } from "./payment.service";
import configuration from "../../config";

const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    // console.log(payload,'this is payload',req.query,'thisis query')
    const tenantId = req.user?.id;
    const result = await paymentServices.createPaymentInDb(
      payload,
      tenantId as string,
    );
    sendResponse(res, {
      statusCode: httpsStatus.CREATED,
      success: true,
      message: "Payment created",
      data: result,
    });
  },
);

//payment confirm cotorler

const verifySslCommerzPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("helo this is been hitted")
    const { rentalRequestId, tranId, status } = req.query;

    const val_id = req.body.val_id;
    // console.log(rentalRequestId,transId,status,'from verify ssl commerz  controller',req.body)

    const result = await paymentServices.verifySslCommerzPayment(
      rentalRequestId as string,
      tranId as string,
      status as string,
      val_id,
    );
   

    if (status === "success") {
      return res.redirect(`${configuration.front_end_Url}/success.html`);
    }

    if (status === "fail") {
      return res.redirect(`${configuration.front_end_Url}/failed.html`);
    }

    return res.redirect(`${configuration.front_end_Url}/cancel.html`);

    
  },
);

//get users payment history

const getUsersPaymentHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: httpsStatus.CREATED,
      success: true,
      message: "Payment created",
      data: null,
    });
  },
);

const getPaymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: httpsStatus.CREATED,
      success: true,
      message: "Payment created",
      data: null,
    });
  },
);

export const paymentController = {
  createPayment,
  verifySslCommerzPayment,
  getUsersPaymentHistory,
  getPaymentDetails,
};
