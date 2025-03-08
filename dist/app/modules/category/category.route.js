"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const verifyToken_1 = require("../../middleware/verifyToken");
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/", (0, verifyToken_1.verifyToken)("Admin"), (0, validateRequest_1.validateRequest)(category_validation_1.categoryValidations.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
router.patch("/:id", (0, verifyToken_1.verifyToken)("Admin"), (0, validateRequest_1.validateRequest)(category_validation_1.categoryValidations.createCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
router.delete("/:id", (0, verifyToken_1.verifyToken)("Admin"), category_controller_1.categoryController.deleteCategory);
router.get("/", category_controller_1.categoryController.getAllCategory);
exports.categoryRoutes = router;
