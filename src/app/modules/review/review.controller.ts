import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewServices } from "./review.service";
import { StatusCodes } from "http-status-codes";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.createReviewIntoDB(req.user.id, req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Review Created successfully",
    data: result,
  });
});
const getProductReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.getProductReviewFromDB(
    req.params.productId
  );

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Review Retrieved successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getProductReview,
};
