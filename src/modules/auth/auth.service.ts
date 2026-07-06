import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUser } from "./auth.interface";
import httpStatus from "http-status";
import configuration from "../../config";
import jwt, { SignOptions } from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwtUtils";
const createUserInDb = async (payload: IUser) => {
  const { firstName, lastName, email, password, status, role } = payload;

  //s-1 check if user already exist or not
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user)
    throw {
      statusCode: httpStatus.CONFLICT,
      message: "User Already Exist , Please Login",
    };

  //s-2 hash passowrd

  const hashPassword = await bcrypt.hash(
    password,
    Number(configuration.bcrypt_salt_round),
  );

  //s-3 password secured create user now

  const result = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
      status,
      role,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

//login user in db
const loginUserInDb=async(email:string,password:string)=>{
//s-1 check if user exist or not
const user=await prisma.user.findUnique({
    where:{email}
})

if(!user) throw {statusCode:httpStatus.NOT_FOUND,message:"User Not Found, Register First"}

//s-2 user exist now check the password

const isValidPassword=await bcrypt.compare(password,user.password)

if(!isValidPassword) throw {statusCode:httpStatus.UNAUTHORIZED,message:"Invalid Password Try Again"}

//s-3 now user all info are correct generate token

const jwtPayload={
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    role:user.role,
    status:user.status
}

//access tokena and refresh token

const accessToken=jwtUtils.createToken(jwtPayload,configuration.jwt_access_secret,configuration.jwt_access_expires_in as SignOptions)

const refreshToken=jwtUtils.createToken(jwtPayload,configuration.jwt_refresh_access_secret,configuration.jwt_refresh_expires_in as SignOptions)
return {accessToken,refreshToken}


}


export const authServices = {
  createUserInDb,
  loginUserInDb
  
};
