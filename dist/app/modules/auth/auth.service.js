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
exports.authServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendEmail_1 = require("../../utils/sendEmail");
const registerUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.auth.create({ data: payload });
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.auth.findMany({ where: { isDeleted: false, role: { not: { equals: 'Admin' } } } });
    return result;
});
const changePasswordIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findFirstOrThrow({
        where: { email: payload.email },
    });
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new Error("Old Password not matched");
    }
    const result = yield prismaClient_1.prisma.auth.update({
        where: { id: user.id },
        data: { password: payload.newPassword },
    });
    return result;
});
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findFirstOrThrow({
        where: { email: payload.email, isDeleted: false, status: "Active" },
    });
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password not matched");
    }
    const jwtPayload = {
        role: user.role,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret, {
        expiresIn: config_1.default.access_token_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.refresh_token_secret, { expiresIn: config_1.default.refresh_token_expires_in });
    return { user, token, refreshToken };
});
const sendLinkToEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield prismaClient_1.prisma.auth.findFirst({ where: { email: payload.email } });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    // create access token to send to the client
    const jwtPayload = {
        role: user.role,
        email: user.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret, {
        expiresIn: "30m",
    });
    const resetLink = `https://multivendor-ecommerce-frontend-gilt.vercel.app/reset-password?id=${user.id}&token=${accessToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
});
const setForgottenPasswordIntoDB = (useremail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield prismaClient_1.prisma.auth.findFirst({ where: { email: payload.email } });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prismaClient_1.prisma.auth.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
    return result;
});
const changeStatusIntoDb = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.auth.update({
        where: { id },
        data: { status },
    });
    return result;
});
const softDeleteUserIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.auth.update({
        where: { id },
        data: { isDeleted: true },
    });
    return result;
});
exports.authServices = {
    registerUserIntoDb,
    changePasswordIntoDb,
    loginUserService,
    changeStatusIntoDb,
    softDeleteUserIntoDb,
    sendLinkToEmail,
    setForgottenPasswordIntoDB,
    getAllUserFromDb
};
