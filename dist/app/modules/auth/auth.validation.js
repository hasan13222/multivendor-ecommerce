"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const filteredRoles = Object.values(client_1.Role).filter(role => role !== 'Admin');
const RoleEnum = zod_1.z.enum(filteredRoles);
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: RoleEnum,
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(Object.values(client_1.Status)),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z.string(),
    }),
});
exports.authValidations = {
    registerUserValidationSchema,
    changePasswordValidationSchema,
    loginValidationSchema,
    changeStatusValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
};
