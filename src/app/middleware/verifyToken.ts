import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Role } from "@prisma/client";
import { prisma } from "../constants/prismaClient";

export const verifyToken = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // check if token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string
    ) as JwtPayload;

    const { email, role } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await prisma.auth.findFirst({ where: { email: email, isDeleted: false, status: "Active" } });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !!!");
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    req.user = { ...(decoded as JwtPayload), id: user.id };
    next();
  });
};
