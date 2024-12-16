import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../middleware/verifyToken";
import { cartValidations } from "./cart.validation";
import { cartController } from "./cart.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken(),
  validateRequest(cartValidations.createCartValidationSchema),
  cartController.createCart
);
router.patch(
  "/:id",
  verifyToken(),
  validateRequest(cartValidations.updateCartValidationSchema),
  cartController.updateCart
);
router.delete("/:id", verifyToken(), cartController.deleteCart);
router.get("/", verifyToken(), cartController.getAllCart);

export const cartRoutes = router;
