"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const verifyToken_1 = require("../../middleware/verifyToken");
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", (0, verifyToken_1.verifyToken)(), (0, validateRequest_1.validateRequest)(review_validation_1.reviewValidations.createReviewValidationSchema), review_controller_1.reviewController.createReview);
router.get("/:productId", review_controller_1.reviewController.getProductReview);
exports.reviewRoutes = router;
