import { Role, UserStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"


const getAllUsersFromDb=async()=>{
const result=await prisma.user.findMany()
return result
}

// update user status
const updateUserStatus=async(status:UserStatus,userId:string)=>{
//s-1 check user exist
const user=await prisma.user.findUniqueOrThrow({where:{id:userId}})
console.log(user,'this is the user',userId)
//s-2 if user role is admin then this user cant be ban
if(user.role===Role.ADMIN) throw{status:401,message:"Unauth you cant ban or update status of admin"}
//s-3 update status
const result=await prisma.user.update({
    where:{
        id:userId
    },
    data:{
        status
    }
})
return result
}

// get all properties for admin manage
const getAllPropertiesFromDb=()=>{

}

//get all rental request for admin manage
const getAllRentalRequestFromDb=()=>{

}
export const adminServices={
    getAllUsersFromDb,
    updateUserStatus,
    getAllPropertiesFromDb,
    getAllRentalRequestFromDb
}