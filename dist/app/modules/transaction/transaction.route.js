"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const transaction_controller_1 = require("./transaction.controller");
const router = express_1.default.Router();
router.get("/", (0, verifyToken_1.verifyToken)("Admin"), transaction_controller_1.transactionController.getAllTransaction);
router.get("/my-transaction", (0, verifyToken_1.verifyToken)(), transaction_controller_1.transactionController.getMyTransaction);
router.get("/my-shop-transaction", (0, verifyToken_1.verifyToken)("Vendor"), transaction_controller_1.transactionController.getMyShopTransaction);
exports.transactionRoutes = router;
