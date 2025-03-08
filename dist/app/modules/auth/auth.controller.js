"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash(req.body.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield auth_service_1.authServices.registerUserIntoDb(Object.assign(Object.assign({}, req.body), { password }));
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: "User Registered successfully",
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = yield bcrypt_1.default.hash(req.body.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield auth_service_1.authServices.changePasswordIntoDb(Object.assign(Object.assign({}, req.body), { newPassword, email: req.user.email }));
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Password Changed successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUserService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "You are logged in successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.getAllUserFromDb();
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "All user retrieved in successfully",
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Refresh token not found");
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refresh_token_secret);
    if (!decoded) {
        return (0, sendResponse_1.sendResponse)(res, {
            status: http_status_codes_1.StatusCodes.FORBIDDEN,
            message: "You are not authorized",
            data: null,
        });
    }
    const { email, role } = decoded;
    const jwtPayload = {
        role,
        email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret, {
        expiresIn: config_1.default.access_token_expires_in,
    });
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Acceess token has been sent successfully",
        data: { token },
    });
}));
const forgetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.sendLinkToEmail(req.body);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const useremail = req.user.email;
    const result = yield auth_service_1.authServices.setForgottenPasswordIntoDB(useremail, req.body);
    return (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Password changed successfully',
        data: result,
    });
}));
const changeStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield auth_service_1.authServices.changeStatusIntoDb(id, req.body.status);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "User Status changed successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield auth_service_1.authServices.softDeleteUserIntoDb(id);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.authController = {
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
