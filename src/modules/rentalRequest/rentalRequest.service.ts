import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

import { IRentalRequest } from "./rentalRequest.interface";

const createRentalRequestInDb = async (
  payload: IRentalRequest,
  tenantId: string,
) => {
  const { totalAmount, propertyId } = payload;
  const existingRentalRequestForThisTenant =
    await prisma.rentalRequest.findFirst({
      where: {
        tenantId,
        propertyId,
        status: {
          in: [RentalRequestStatus.PENDING, RentalRequestStatus.APPROVED,RentalRequestStatus.ACTIVE],
        },
      },
    });
  if (existingRentalRequestForThisTenant)
  throw {
  statusCode: 409,
  name: "ConflictError",
  message: "You already requested for this property wait for landlord response",
};
  const result = await prisma.rentalRequest.create({
    data: {
      totalAmount,
      propertyId,
      tenantId,
    },
    include: {
      property: true,
      tenant: {
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

//get current login user rental request
const getCurrentUserAllRentalRequestFromDb = async (tenantId: string) => {
   const result=await prisma.rentalRequest.findMany({
    where:{
        tenantId
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
};

//get rental request details
const getRentalRequestDetailsFromDb = async (requestId: string) => {
    const result=await prisma.rentalRequest.findUniqueOrThrow({
        where:{
            id:requestId
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
};

export const rentalRequestServices = {
  createRentalRequestInDb,
  getCurrentUserAllRentalRequestFromDb,
  getRentalRequestDetailsFromDb,
};
