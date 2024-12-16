import express from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyToken("Admin"), authController.getAllUser);
router.post(
  "/register",
  validateRequest(authValidations.registerUserValidationSchema),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authController.loginUser
);
router.post(
  "/change-password",
  verifyToken(),
  validateRequest(authValidations.changePasswordValidationSchema),
  authController.changePassword
);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-account-status/:id",
  verifyToken("Admin"),
  validateRequest(authValidations.changeStatusValidationSchema),
  authController.changeStatus
);
router.post(
  "/delete-account/:id",
  verifyToken("Admin"),
  authController.deleteUser
);
router.post('/forget-password', validateRequest(authValidations.forgetPasswordValidationSchema), authController.forgetPassword)
router.post('/reset-password', verifyToken(), validateRequest(authValidations.resetPasswordValidationSchema), authController.resetPassword)

export const authRoutes = router;
