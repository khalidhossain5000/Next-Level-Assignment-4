import { prisma } from "../../lib/prisma"


const getAllUsersFromDb=async()=>{
const result=await prisma.user.findMany()
return result
}

// update user status
const updateUserStatus=()=>{

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