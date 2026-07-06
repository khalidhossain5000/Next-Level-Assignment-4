import { prisma } from "../../lib/prisma"

const createCategoriesInDb=async(categoryName:string)=>{
const result=await prisma.categories.create({
    data:{
        name:categoryName
    },
    include:{
        properties:true
    }
})
return result
}

export const categoriesService={
    createCategoriesInDb
}