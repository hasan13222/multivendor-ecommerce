import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../middleware/verifyToken";
import { productValidations } from "./product.validation";
import { productController } from "./product.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken("Vendor", "Admin"),
  validateRequest(productValidations.createProductValidationSchema),
  productController.createProduct
);
router.patch(
  "/:id",
  verifyToken("Vendor", "Admin"),
  validateRequest(productValidations.updateProductValidationSchema),
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken("Vendor", "Admin"),
  productController.deleteProduct
);
router.get("/", productController.getAllProduct);
router.post("/cart", productController.getCartProduct);
router.get("/:id", productController.getSingleProduct);
router.get("/shop/:shopId", productController.getShopProduct);

export const productRoutes = router;
