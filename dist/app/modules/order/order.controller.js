"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const order_service_1 = require("./order.service");
const http_status_codes_1 = require("http-status-codes");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripeinstance = new stripe_1.default(config_1.default.stripe_secret);
const createOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body.map((item) => {
        return Object.assign(Object.assign({}, item), { userId: req.user.id });
    });
    const result = yield order_service_1.orderServices.createOrderIntoDB(payload);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: "Order Created successfully",
        data: result,
    });
}));
const getMyOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getMyOrderFromDB(req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Order Retrieved successfully",
        data: result,
    });
}));
const getMyShopOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getMyShopOrderFromDB(req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Order Retrieved successfully",
        data: result,
    });
}));
const orderPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripeinstance.paymentIntents.create({
        amount: Number(req.body.amount) * 100,
        currency: "usd",
        payment_method_types: ["card"],
        description: "Software development services",
        shipping: {
            name: req.body.name,
            address: {
                line1: "510 Townsend St",
                postal_code: "98140",
                city: "San Francisco",
                state: "CA",
                country: "US",
            },
        },
    });
    const transactionResult = yield order_service_1.orderServices.createTransactionIntoDB({
        productId: req.body.productId,
        userId: req.user.id,
        amount: req.body.amount,
    });
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Payment done successfully",
        data: {
            clientSecret: paymentIntent.client_secret,
        },
    });
}));
const changeOrderStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.changeOrderStatusIntoDb(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Order Status Changed successfully",
        data: result,
    });
}));
exports.orderController = {
    createOrder,
    getMyOrder,
    getMyShopOrder,
    orderPayment,
    changeOrderStatus
};
