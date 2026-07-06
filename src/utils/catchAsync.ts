import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error: any) {
      console.log("Error in catchAsync", error);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal Server error and something went wrong",
        error: error?.message,
      });
    }
  };
};
export default catchAsync