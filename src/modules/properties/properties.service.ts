import { prisma } from "../../lib/prisma"
import { IProperties, IUpdateProperty } from "./properties.interface"



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

//update property
const updatePropertyInDb=async(payload:IUpdateProperty,propertyId:string ,landLordId:string ,isLandlord:boolean)=>{
const property=await prisma.properties.findUniqueOrThrow({where:{id:propertyId}})

if(!isLandlord && property.landLordId!==landLordId)  throw {statusCode:401 , message:"Your dont have permission to update"}



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


export const propertiesServices={
createPropertiesInDb,
updatePropertyInDb
}