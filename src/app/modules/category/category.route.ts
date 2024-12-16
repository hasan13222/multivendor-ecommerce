import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../middleware/verifyToken";
import { categoryValidations } from "./category.validation";
import { categoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken("Admin"),
  validateRequest(categoryValidations.createCategoryValidationSchema),
  categoryController.createCategory
);
router.patch(
  "/:id",
  verifyToken("Admin"),
  validateRequest(categoryValidations.createCategoryValidationSchema),
  categoryController.updateCategory
);
router.delete("/:id", verifyToken("Admin"), categoryController.deleteCategory);
router.get("/", categoryController.getAllCategory);

export const categoryRoutes = router;
