import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { newsletterServices } from "./newsletter.service";

const createNewsletter = catchAsync(async (req: Request, res: Response) => {
  const result = await newsletterServices.createNewsletterIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Newsletter Created successfully",
    data: result,
  });
});


export const newsletterController = {
  createNewsletter,
};
