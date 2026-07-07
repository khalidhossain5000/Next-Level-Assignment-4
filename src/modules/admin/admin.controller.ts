

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status"
import { adminServices } from "./admin.service";
const getAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const result=await adminServices.getAllUsersFromDb()
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Rental Request For Your Properteis retirved successfull",
      data: result,
    });

})

//update user status
const updateUserStatus=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Rental Request For Your Properteis retirved successfull",
      data: null,
    });

})

//get all properties for admin manage
const getAllProperties=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Rental Request For Your Properteis retirved successfull",
      data: null,
    });

})

//get all rental request from db for admin manager
const getAllRentalRequest=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Rental Request For Your Properteis retirved successfull",
      data: null,
    });

})


export const adminController={
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequest
}