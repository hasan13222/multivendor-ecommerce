import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { orderServices } from "./order.service";
import { StatusCodes } from "http-status-codes";
import stripe from "stripe";
import config from "../../config";

const stripeinstance = new stripe(config.stripe_secret as string);

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body.map((item: any) => {
    return { ...item, userId: req.user.id };
  });
  const result = await orderServices.createOrderIntoDB(payload);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Order Created successfully",
    data: result,
  });
});

const getMyOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getMyOrderFromDB(req.user.id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Order Retrieved successfully",
    data: result,
  });
});

const getMyShopOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getMyShopOrderFromDB(req.user.id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Order Retrieved successfully",
    data: result,
  });
});

const orderPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentIntent = await stripeinstance.paymentIntents.create({
    amount: Number(req.body.amount) * 100,
    currency: "usd",
    payment_method_types: ["card"],
    description: "Software development services",
    shipping: {
      name: req.body.name,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
  });

  const transactionResult = await orderServices.createTransactionIntoDB({
    productId: req.body.productId,
    userId: req.user.id,
    amount: req.body.amount,
  });

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Payment done successfully",
    data: {
      clientSecret: paymentIntent.client_secret,
    },
  });
});

const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.changeOrderStatusIntoDb(req.params.id, req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Order Status Changed successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getMyOrder,
  getMyShopOrder,
  orderPayment,
  changeOrderStatus
};
