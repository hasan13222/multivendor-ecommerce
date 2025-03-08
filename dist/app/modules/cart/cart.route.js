"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const verifyToken_1 = require("../../middleware/verifyToken");
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post("/", (0, verifyToken_1.verifyToken)(), (0, validateRequest_1.validateRequest)(cart_validation_1.cartValidations.createCartValidationSchema), cart_controller_1.cartController.createCart);
router.patch("/:id", (0, verifyToken_1.verifyToken)(), (0, validateRequest_1.validateRequest)(cart_validation_1.cartValidations.updateCartValidationSchema), cart_controller_1.cartController.updateCart);
router.delete("/:id", (0, verifyToken_1.verifyToken)(), cart_controller_1.cartController.deleteCart);
router.get("/", (0, verifyToken_1.verifyToken)(), cart_controller_1.cartController.getAllCart);
exports.cartRoutes = router;
