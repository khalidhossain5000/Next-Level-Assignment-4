import { PropertyStatus } from "../../../generated/prisma/enums";



export interface IProperties{
    title:string;
    description:string;
    location:string;
    price:number;
    amenities:string;
    status:PropertyStatus;

}