import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status"
import { categoriesService } from "./categories.service";
const createCategories=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const {name}=req.body


    const result=await categoriesService.createCategoriesInDb(name)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Categories Created Successfully",
      data: result,
    });

})




export const categoriesController={
    createCategories
}
