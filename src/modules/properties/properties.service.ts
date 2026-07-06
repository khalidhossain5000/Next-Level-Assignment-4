import { prisma } from "../../lib/prisma"
import { IProperties } from "./properties.interface"






const createPropertiesInDb=async(payload:IProperties,landLordId:string,categoryId:string)=>{
    console.log(categoryId,'this is cat id here', typeof(categoryId),payload,'this is payload')
const result=await prisma.properties.create({
    data:{
        ...payload,
        landLordId,
        categoryId
    }
})
return result
}

export const propertiesServices={
createPropertiesInDb
}