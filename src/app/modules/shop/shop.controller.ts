import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { shopServices } from "./shop.service";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.createShopIntoDB({...req.body, userId: req.user.id});

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Created successfully",
    data: result,
  });
});

const checkShopFollow = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.checkShopFollowIntoDB(
    req.user.id,
    req.params.shopId
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Follow Checked successfully",
    data: result,
  });
});
const followShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.followShopIntoDB(
    req.user.id,
    req.params.shopId
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop followed successfully",
    data: result,
  });
});
const unfollowShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.unfollowShopIntoDB(
    req.user.id,
    req.params.shopId
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop unfollowed successfully",
    data: result,
  });
});

const getAllShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.getAllShopFromDB();

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shops Retrieved successfully",
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.getMyShopFromDB(req.user.email);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Retrieved successfully",
    data: result,
  });
});

const getSingleShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.getSingleShopFromDB(req.params.id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Retrieved successfully",
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.updateShopIntoDB(
    req.user.email,
    req.params.id,
    req.body
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Updated successfully",
    data: result,
  });
});

const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.deleteShopFromDB(
    req.user.email,
    req.params.id
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop Deleted successfully",
    data: result,
  });
});

const changeShopStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.changeShopStatusIntoDb(
    req.body.status,
    req.params.id
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Shop status changed successfully",
    data: result,
  });
});

export const shopController = {
  createShop,
  getAllShop,
  getMyShop,
  updateShop,
  deleteShop,
  followShop,
  unfollowShop,
  getSingleShop,
  checkShopFollow,
  changeShopStatus
};
