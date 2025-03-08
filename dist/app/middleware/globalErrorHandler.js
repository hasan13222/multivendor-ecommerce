"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
function handleZodError(err) {
    const errorMessages = err.issues.map(issue => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return errorMessages;
}
const globalErrorHandler = (err, req, res, next) => {
    if (err) {
        let statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        let message = err.message || "Something went wrong";
        let errorSources = [
            { path: "", message: "Something went wrong" },
        ];
        if (err instanceof zod_1.ZodError) {
            errorSources = handleZodError(err);
        }
        return res.status(statusCode).json({
            success: false,
            message,
            errorSources,
            stack: config_1.default.node_env === 'Development' ? err.stack : null
        });
    }
    else {
        next();
    }
};
exports.globalErrorHandler = globalErrorHandler;
