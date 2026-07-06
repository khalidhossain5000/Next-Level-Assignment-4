import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authServices.createUserInDb(payload);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Registered Successfull",
      data: result,
    });


  },
);



//login user
const loginUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const {email,password}=req.body;
const result=await authServices.loginUserInDb(email,password)
  sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Login Successfull",
      data: result,
    });

})
export const authController = {
  registerUser,
  loginUser
};
