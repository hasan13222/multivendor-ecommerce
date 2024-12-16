import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { authServices } from "./auth.service";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const password = await bcrypt.hash(
    req.body.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await authServices.registerUserIntoDb({
    ...req.body,
    password,
  });

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "User Registered successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const newPassword = await bcrypt.hash(
    req.body.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await authServices.changePasswordIntoDb({
    ...req.body,
    newPassword,
    email: req.user.email
  });

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Password Changed successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUserService(req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "You are logged in successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.getAllUserFromDb();

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "All user retrieved in successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken) {
    throw new AppError(StatusCodes.NOT_FOUND, "Refresh token not found");
  }
  const decoded = jwt.verify(
    refreshToken as string,
    config.refresh_token_secret as string
  ) as JwtPayload;

  if (!decoded) {
    return sendResponse(res, {
      status: StatusCodes.FORBIDDEN,
      message: "You are not authorized",
      data: null,
    });
  }
  const { email, role } = decoded as JwtPayload;
  const jwtPayload = {
    role,
    email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: config.access_token_expires_in,
  });
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: "Acceess token has been sent successfully",
    data: { token },
  });
});


const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.sendLinkToEmail(req.body);
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const useremail = req.user.email as string;
  const result = await authServices.setForgottenPasswordIntoDB(
    useremail,
    req.body,
  );
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await authServices.changeStatusIntoDb(id, req.body.status);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User Status changed successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await authServices.softDeleteUserIntoDb(id);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User deleted successfully",
    data: result,
  });
});

export const authController = {
  registerUser,
  changePassword,
  loginUser,
  refreshToken,
  changeStatus,
  deleteUser,
  forgetPassword,
  resetPassword,
  getAllUser
};
