import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status"
import { propertiesServices } from "./properties.service";

const createProperties=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const payload=req.body
    const categoryId=req.body.categoryId
    const landLordId=req.user?.id
    const result=await propertiesServices.createPropertiesInDb(payload,landLordId as string,categoryId)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Properties Created Successfully",
      data: result,
    });

})

export const propertyController={
    createProperties
}