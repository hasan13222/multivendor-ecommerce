import { Auth, Status } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";

const registerUserIntoDb = async (payload: Auth) => {
  const result = await prisma.auth.create({ data: payload });
  return result;
};

const getAllUserFromDb = async () => {
  const result = await prisma.auth.findMany({where: {isDeleted: false,role: {not: {equals: 'Admin'}}}});
  return result;
};

type TChangePassword = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

const changePasswordIntoDb = async (payload: TChangePassword) => {
  const user = await prisma.auth.findFirstOrThrow({
    where: { email: payload.email },
  });

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error("Old Password not matched");
  }

  const result = await prisma.auth.update({
    where: { id: user.id },
    data: { password: payload.newPassword },
  });

  return result;
};

const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await prisma.auth.findFirstOrThrow({
    where: { email: payload.email, isDeleted: false, status: "Active" },
  });

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error("Password not matched");
  }
  const jwtPayload = {
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: config.access_token_expires_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.refresh_token_secret as string,
    { expiresIn: config.refresh_token_expires_in }
  );

  return { user, token, refreshToken };
};

const sendLinkToEmail = async (payload: TChangePassword) => {
  //  check if user exists
  const user = await prisma.auth.findFirst({ where: { email: payload.email } });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  // create access token to send to the client
  const jwtPayload = {
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: "30m",
    }
  );

  const resetLink = `https://multivendor-ecommerce-frontend-gilt.vercel.app/reset-password?id=${user.id}&token=${accessToken}`;
  sendEmail(user.email, resetLink);
};

const setForgottenPasswordIntoDB = async (
  useremail: string,
  payload: TChangePassword
) => {
  //  check if user exists
  const user = await prisma.auth.findFirst({ where: { email: payload.email } });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.auth.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
  return result;
};

const changeStatusIntoDb = async (id: string, status: Status) => {
  const result = await prisma.auth.update({
    where: { id },
    data: { status },
  });

  return result;
};

const softDeleteUserIntoDb = async (id: string) => {
  const result = await prisma.auth.update({
    where: { id },
    data: { isDeleted: true },
  });

  return result;
};

export const authServices = {
  registerUserIntoDb,
  changePasswordIntoDb,
  loginUserService,
  changeStatusIntoDb,
  softDeleteUserIntoDb,
  sendLinkToEmail,
  setForgottenPasswordIntoDB,
  getAllUserFromDb
};
