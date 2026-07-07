import { prisma } from "../../lib/prisma"
import { IProperties, IUpdateProperty } from "./landlord.interface"



const createPropertiesInDb=async(payload:IProperties,landLordId:string,categoryId:string)=>{
   
const result=await prisma.properties.create({
    data:{
        ...payload,
        landLordId,
        categoryId
    }
})
return result
}

//get all rental request for landlord management
const getAllRentalRequestFromDb=async(landLordId:string,isLandLord:boolean)=>{

    if(!isLandLord) throw {statusCode:409 ,message:"Unauth access you dont have permission for this"}
    const result=await prisma.rentalRequest.findMany({
        where:{
            property:{
                landLordId
            }
        },
        include:{
            property:true,
            tenant:{
                omit:{
                    password:true
                }
            }
        }
    })
    return result
}

//update property
const updatePropertyInDb=async(payload:IUpdateProperty,propertyId:string ,landLordId:string ,isLandlord:boolean)=>{
const property=await prisma.properties.findUniqueOrThrow({where:{id:propertyId}})

if(!isLandlord && property.landLordId!==landLordId)  throw {statusCode:401 , message:"Your dont have permission to update" }



const updateResult=await prisma.properties.update({
    where:{id:propertyId},
    data:{
        ...payload
    },
    include:{
        user:{
            omit:{
                password:true
            }
        },
        category:true
    }
})
return updateResult



}

//delete property
const deletePropertyInDb=async(id:string,landLordId:string)=>{

const property=await prisma.properties.findUniqueOrThrow({
    where:{id}
})

if(property.landLordId!==landLordId) throw {statusCode:401,message:"You dont have permission"}


const result=await prisma.properties.delete({
    where:{id}
})
return result
}

export const propertiesServices={
createPropertiesInDb,
updatePropertyInDb,
deletePropertyInDb,
getAllRentalRequestFromDb
}