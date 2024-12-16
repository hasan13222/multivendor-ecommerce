import { ErrorRequestHandler, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import config from "../config";

type TErrorSource = {
  path: string | number;
  message: string;
}[]

function handleZodError(err: ZodError): TErrorSource{
    const errorMessages = err.issues.map(issue => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }
    })
    return errorMessages;
}

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  if (err) {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || "Something went wrong";
    let errorSources: TErrorSource = [
      { path: "", message: "Something went wrong" },
    ];

    if(err instanceof ZodError){
        errorSources = handleZodError(err)
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.node_env === 'Development' ? err.stack : null
    })
  } else {
    next();
  }
};
