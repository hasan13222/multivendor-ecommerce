import express from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { couponController } from "./coupon.controller";

const router = express.Router();

router.post("/", verifyToken("Admin"), couponController.createCoupon);
router.patch("/:id", verifyToken("Admin"), couponController.updateCoupon);
router.delete("/:id", verifyToken("Admin"), couponController.deleteCoupon);
router.get("/", couponController.getCoupon);
router.get("/all", couponController.getAllCoupon);

export const couponRoutes = router;
