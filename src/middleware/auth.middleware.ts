import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { jwtUtils } from "../utils/jwtUtils";
import configuration from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";

//declare global type

declare global {
  namespace Express {
    interface Request {
      user?: {
        firstName: string;
        lastName: string;
        id: string;
        email: string;
        role: Role;
        status: UserStatus;
      };
    }
  }
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //s-1 get the tooken
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token)
      throw {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid Token ,Register or login",
      };
    //s-2 token validation
    const verifiedToken = jwtUtils.verifyToken(
      token,
      configuration.jwt_access_secret,
    );
  
    if (!verifiedToken.success)
      throw {
        statusCode: httpStatus.UNAUTHORIZED,
        message: verifiedToken.error,
      };

    const { firstName, lastName, email, role, status, userId } =
      verifiedToken.data as JwtPayload;

    //s-3 check if user role match with given one
    if (!requiredRoles.includes(role))
      throw {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You dont have access from cheking role",
      };

    //s-4 check user in db

    const user = await prisma.user.findUnique({
      where: { email, id: userId },
    });

    if (!user)
      throw {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not found register or login",
      };

    //s-5 checking if user in banned or not

    if (user.status === UserStatus.BAN)
      throw {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User is Banned,Contact the support",
      };

    //s-6 all is perfect set user in req

    req.user = {
      id: userId,
      firstName,
      lastName,
      email,
      role,
      status,
    };
    next();
  });
};

export default auth;
