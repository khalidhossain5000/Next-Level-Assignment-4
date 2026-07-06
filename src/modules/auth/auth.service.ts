
import { prisma } from "../../lib/prisma"
import { IUser } from "./auth.interface"



const createUserInDb=async(payload:IUser)=>{
const result=await prisma.user.create({
    data:{
        ...payload
    }
})
return result
}

export const authServices={
    createUserInDb
}