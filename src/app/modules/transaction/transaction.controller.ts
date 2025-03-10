import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { transactionServices } from "./transaction.service";
import { StatusCodes } from "http-status-codes";

const getAllTransaction = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body.map((item: any) => {
    return { ...item, userId: req.user.id };
  });
  const result = await transactionServices.getAllTransactionFromDB();

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Transaction Retrieved successfully",
    data: result,
  });
});

const getMyTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await transactionServices.getMyTransactionFromDB(req.user.id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Transaction Retrieved successfully",
    data: result,
  });
});

const getMyShopTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await transactionServices.getMyShopTransactionFromDB(req.params.shopId);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Transaction Retrieved successfully",
    data: result,
  });
});


export const transactionController = {
  getAllTransaction,
  getMyTransaction,
  getMyShopTransaction,
};
