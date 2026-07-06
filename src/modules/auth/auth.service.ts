
import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { IUser } from "./auth.interface"
import httpStatus from "http-status"
import configuration from "../../config"


const createUserInDb=async(payload:IUser)=>{
    const {firstName,lastName,email,password,status,role} =payload

    //s-1 check if user already exist or not
    const user=await prisma.user.findUnique({
        where:{email}
    })

    if(user) throw {statusCode:httpStatus.CONFLICT,message:"User Already Exist , Please Login"}

//s-2 hash passowrd

const hashPassword=await bcrypt.hash(password,Number(configuration.bcrypt_salt_round))


//password secured create user now


const result=await prisma.user.create({
    data:{
        firstName,
        lastName,
        email,
        password:hashPassword,
        status,
        role
    },
    omit:{
        password:true
    }
})
return result
}

export const authServices={
    createUserInDb
}