import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { propertiesServices } from "./properties.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllPropertiesWithFilter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await propertiesServices.getAllPropertiesFromDb(query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Properties Retrived Successfully",
      data: result,
    });
  },
);

//get property details
const getPropertyDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await propertiesServices.getSinglePropertyFromDb(
      id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Property Details Successfully",
      data: result,
    });
  },
);

export const propertiesController = {
  getAllPropertiesWithFilter,
  getPropertyDetails,
};
