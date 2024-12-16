import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { couponServices } from "./coupon.service";
import { StatusCodes } from "http-status-codes";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await couponServices.createCouponIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Coupon Created successfully",
    data: result,
  });
});
const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await couponServices.updateCouponIntoDB(id, req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Coupon updated successfully",
    data: result,
  });
});
const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await couponServices.deleteCouponIntoDB(id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Coupon deleted successfully",
    data: result,
  });
});
const getCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await couponServices.getCouponFromDB(req.params.code);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Coupon Retrieved successfully",
    data: result,
  });
});

export const couponController = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};
