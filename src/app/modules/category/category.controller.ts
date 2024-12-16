import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { categoryServices } from "./category.service";
import { StatusCodes } from "http-status-codes";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Category Created successfully",
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await categoryServices.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Category updated successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await categoryServices.deleteCategoryIntoDB(id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Category deleted successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Category Retrieved successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory
};
