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
const updatePropertyInDb=async(payload:IUpdateProperty,propertyId:string)=>{

}


export const propertiesServices={
createPropertiesInDb,
updatePropertyInDb
}