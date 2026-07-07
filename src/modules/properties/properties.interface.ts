import { PropertiesWhereInput } from "../../../generated/prisma/models";

export interface IPropertyQuery extends PropertiesWhereInput{
    
    type?:string;
    minPrice?:string;
    maxPrice?:string;
    searchTerm?:string;
}