import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { productServices } from "./product.service";
import { StatusCodes } from "http-status-codes";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProductIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Product Created successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productServices.updateProductIntoDB(
    req.user.email,
    id,
    req.body
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Product updated successfully",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productServices.deleteProductIntoDB(req.user.email, id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Product deleted successfully",
    data: result,
  });
});
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllProductFromDB(req.query);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Product Retrieved successfully",
    data: result.result,
    meta: result.meta
  });
});
const getCartProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getCartProductFromDB(req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Cart Product Retrieved successfully",
    data: result,
  });
});
const getShopProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getShopProductFromDB(
    req.params.shopId,
    req.query
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Product Retrieved successfully",
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Single Product Retrieved successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getShopProduct,
  getSingleProduct,
  getCartProduct
};
