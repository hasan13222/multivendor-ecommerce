import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cartServices } from "./cart.service";
import { StatusCodes } from "http-status-codes";

const createCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartServices.createCartIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Cart Created successfully",
    data: result,
  });
});
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await cartServices.updateCartIntoDB(id, req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Cart updated successfully",
    data: result,
  });
});
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await cartServices.deleteCartIntoDB(id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Cart deleted successfully",
    data: result,
  });
});
const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartServices.getAllCartFromDB();

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Cart Retrieved successfully",
    data: result,
  });
});

export const cartController = {
  createCart,
  updateCart,
  deleteCart,
  getAllCart
};
