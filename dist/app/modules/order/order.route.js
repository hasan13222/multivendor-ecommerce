"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", (0, verifyToken_1.verifyToken)(), order_controller_1.orderController.createOrder);
router.post("/payment", (0, verifyToken_1.verifyToken)(), order_controller_1.orderController.orderPayment);
router.get("/my-order", (0, verifyToken_1.verifyToken)(), order_controller_1.orderController.getMyOrder);
router.get("/my-shop-order", (0, verifyToken_1.verifyToken)(), order_controller_1.orderController.getMyShopOrder);
exports.orderRoutes = router;
