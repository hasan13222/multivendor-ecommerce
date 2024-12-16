import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { shopValidations } from "./shop.validation";
import { shopController } from "./shop.controller";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.post(
  "/",
  verifyToken("Vendor", "Admin"),
  validateRequest(shopValidations.createShopValidationSchema),
  shopController.createShop
);
router.post("/follow/:shopId", verifyToken(), shopController.followShop);
router.delete("/unfollow/:shopId", verifyToken(), shopController.unfollowShop);
router.get("/", verifyToken("Admin"), shopController.getAllShop);
router.get("/:id", verifyToken(), shopController.getSingleShop);
router.get(
  "/check-follow/:shopId",
  verifyToken(),
  shopController.checkShopFollow
);
router.get(
  "/shop/mine",
  verifyToken("Vendor", "Admin"),
  shopController.getMyShop
);
router.patch(
  "/:id",
  verifyToken("Vendor", "Admin"),
  validateRequest(shopValidations.updateShopValidationSchema),
  shopController.updateShop
);
router.patch(
  "/change-shop-status/:id",
  verifyToken("Admin"),
  shopController.changeShopStatus
);
router.delete(
  "/:id",
  verifyToken("Vendor", "Admin"),
  shopController.deleteShop
);

export const shopRoutes = router;
