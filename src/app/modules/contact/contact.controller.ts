import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { contactServices } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "Contact Created successfully",
    data: result,
  });
});


export const contactController = {
  createContact,
};
