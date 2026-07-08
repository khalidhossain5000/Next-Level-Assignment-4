//intiate payment

import axios from "axios";
import {
  PaymentStatus,
  RentalRequestStatus,
} from "../../../generated/prisma/enums";
import configuration from "../../config";
import { prisma } from "../../lib/prisma";

const createPaymentInDb = async (payload: any, tenantId: string) => {
  // console.log(tenantId,'tenatn id from paymetn service')
  const transId = `TRNX_ID_${Date.now()}`;
  //data from payload
  const { rentalRequestId } = payload;
  //fetch user
  const user = await prisma.user.findUniqueOrThrow({ where: { id: tenantId } });
  //payment will be done if rental request stasus is approved
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id: rentalRequestId },
  });
  // checking ownership if this reuqst done by logged in user
  if (rentalRequest.tenantId !== tenantId)
    throw {
      statusCode: 401,
      message: "You are not allowed to pay for this rental request.",
    };

  //if rent req approved or not
  if (rentalRequest.status !== RentalRequestStatus.APPROVED)
    throw {
      statusCode: 401,
      message:
        "Rental Request is not approved yet ,contact landlord or support",
    };
  const existingPayment = await prisma.payment.findFirst({
    where: {
      rentalRequestId,
      status: PaymentStatus.COMPLETED,
    },
  });
  if (existingPayment)
    throw {
      statusCode: 409,
      message: "Payment has already been completed for this rental request.",
    };

  //intialied paymetn
  const paymentData = {
    store_id: configuration.ssl_commerz_store_id,
    store_passwd: configuration.ssl_commerz_store_password,
    total_amount: payload.totalAmount,
    currency: "BDT",
    tran_id: transId,
    success_url: `${configuration.app_url}/api/payments/confirm?rentalRequestId=${payload.rentalRequestId}&tranId=${transId}&status=success`,
    fail_url: `${configuration.app_url}/api/payments/confirm?rentalRequestId=${payload.rentalRequestId}&tranId=${transId}&status=fail`,
    cancel_url: `${configuration.app_url}/api/payments/confirm?rentalRequestId=${payload.rentalRequestId}&tranId=${transId}&status=cancel`,
    cus_name: `${user.firstName} ${user.lastName}`,
    cus_email: user.email,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: 1000,
    cus_country: "Bangladesh",
    // cus_phone: "01711111111",
    cus_fax: "01711111111",
  };
  //axios hittign the sslxomerz url
  const res = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    paymentData,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );
  const data = res.data;

  await prisma.payment.create({
    data: {
      transactionId: transId,
      provider: "SSL_Commerz",
      totalAmount: payload.totalAmount,
      status: PaymentStatus.PENDING,
      rentalRequestId,
    },
  });
  return { paymentGatewayUrl: data.GatewayPageURL };
};

//payment configm and verify payment that the payment is successfully done
const verifySslCommerzPayment = async (
  rentalRequestId: string,
  transId: string,
  status: string,
  val_id: string,
) => {
  console.log("service trans id", transId);
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${configuration.ssl_commerz_store_id}&store_passwd=${configuration.ssl_commerz_store_password}&format=json
`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  const paymentData = response.data;
  console.log(paymentData, "this is the payment id here");
  if (paymentData.status === "VALID") {
    await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUniqueOrThrow({
        where: {
          transactionId: transId,
        },
      });

      await tx.payment.update({
        where: {
          transactionId: transId,
        },
        data: {
          status: PaymentStatus.COMPLETED,
        },
      });

      await tx.rentalRequest.update({
        where: {
          id: payment.rentalRequestId,
        },
        data: {
          status: RentalRequestStatus.ACTIVE,
        },
      });
    });
  } else if (
    paymentData.status === "FAILED" ||
    paymentData.status === "INVALID_TRANSACTION"
  ) {
    await prisma.payment.update({
      where: {
        transactionId: transId,
      },
      data: {
        status: PaymentStatus.FAILED,
      },
    });
  }

  return status;
};

//get  users payment history
const paymentHistoryFromDb = async () => {};

//get payment details
const paymentDetailsFromDb = async () => {};

export const paymentServices = {
  createPaymentInDb,
  verifySslCommerzPayment,
  paymentHistoryFromDb,
  paymentDetailsFromDb,
};
