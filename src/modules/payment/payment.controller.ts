// POST	/api/payments/create	Create a payment intent/session for an approved rental
// POST	/api/payments/confirm	Confirm/verify payment (webhook or callback)
// GET	/api/payments	Get user's payment history
// GET	/api/payments/:id	Get payment details


import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpsStatus from "http-status"

const createPayment=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
sendResponse(res,{
    statusCode:httpsStatus.CREATED,
    success:true,
    message:"Payment created",
    data:null
})
})

//payment confirm cotorler

const paymentConfirm=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
sendResponse(res,{
    statusCode:httpsStatus.CREATED,
    success:true,
    message:"Payment created",
    data:null
})
})


//get users payment history

const getUsersPaymentHistory=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
sendResponse(res,{
    statusCode:httpsStatus.CREATED,
    success:true,
    message:"Payment created",
    data:null
})
}) 



const getPaymentDetails=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
sendResponse(res,{
    statusCode:httpsStatus.CREATED,
    success:true,
    message:"Payment created",
    data:null
})
})

export const paymentController={
    createPayment,
    paymentConfirm,
    getUsersPaymentHistory,
    getPaymentDetails
}