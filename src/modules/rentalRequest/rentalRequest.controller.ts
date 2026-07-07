

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { rentalRequestServices } from "./rentalRequest.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createRentalRequest=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   

    // const result = await rentalRequestServices.createRentalRequestInDb()

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Rental Request Created Successfully",
      data: null
    });
  },
);

// get current logged in user rental requst
const getCurrentUsersRentalRequest=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   

    // const result = await rentalRequestServices.getCurrentUserAllRentalRequestFromDb()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Yours all rental request retrived successfully",
      data: null
    });
  },
);

//get rental request details
const getRentalRequestDetails=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   

    // const result = await rentalRequestServices.getRentalRequestDetailsFromDb()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rental Request Details Retrived Successfull",
      data: null,
    });
  },
);
export const rentalRequestController={
  createRentalRequest,
  getCurrentUsersRentalRequest,
  getRentalRequestDetails
}