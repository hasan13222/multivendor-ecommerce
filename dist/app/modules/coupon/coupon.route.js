"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const coupon_controller_1 = require("./coupon.controller");
const router = express_1.default.Router();
router.post("/", (0, verifyToken_1.verifyToken)("Admin"), coupon_controller_1.couponController.createCoupon);
router.patch("/:id", (0, verifyToken_1.verifyToken)("Admin"), coupon_controller_1.couponController.updateCoupon);
router.delete("/:id", (0, verifyToken_1.verifyToken)("Admin"), coupon_controller_1.couponController.deleteCoupon);
router.get("/", coupon_controller_1.couponController.getCoupon);
router.get("/all", coupon_controller_1.couponController.getAllCoupon);
exports.couponRoutes = router;
