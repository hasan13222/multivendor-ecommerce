import express from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { transactionController } from "./transaction.controller";

const router = express.Router();

router.get("/", verifyToken("Admin"), transactionController.getAllTransaction)
router.get("/my-transaction", verifyToken(), transactionController.getMyTransaction);
router.get("/my-shop-transaction/:shopId", verifyToken("Vendor"), transactionController.getMyShopTransaction);

export const transactionRoutes = router;
