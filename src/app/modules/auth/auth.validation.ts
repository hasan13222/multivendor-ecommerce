import { Role, Status } from "@prisma/client";
import { z } from "zod";

const filteredRoles = Object.values(Role).filter(role => role !== 'Admin');
const RoleEnum = z.enum(filteredRoles as [string, ...string[]]);

const registerUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    role: RoleEnum,
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(Status) as [string, ...string[]]),
  }),
});


const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string(),
  }),
});

export const authValidations = {
  registerUserValidationSchema,
  changePasswordValidationSchema,
  loginValidationSchema,
  changeStatusValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
