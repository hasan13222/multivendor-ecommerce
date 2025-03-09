import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../middleware/verifyToken";
import { orderValidations } from "./order.validation";
import { orderController } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken(),
  orderController.createOrder
);
router.post("/payment", verifyToken(), orderController.orderPayment)
router.get("/my-order", verifyToken(), orderController.getMyOrder);
router.get("/my-shop-order", verifyToken(), orderController.getMyShopOrder);
router.patch("/:id", verifyToken("Vendor", "Customer"), orderController.changeOrderStatus);

export const orderRoutes = router;
