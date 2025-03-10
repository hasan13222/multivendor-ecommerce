"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const shop_route_1 = require("../modules/shop/shop.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/category/category.route");
const cart_route_1 = require("../modules/cart/cart.route");
const order_route_1 = require("../modules/order/order.route");
const review_route_1 = require("../modules/review/review.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const contact_route_1 = require("../modules/contact/contact.route");
const newsletter_route_1 = require("../modules/newsletter/newsletter.route");
const transaction_route_1 = require("../modules/transaction/transaction.route");
const router = express_1.default.Router();
const moduleRouters = [
    {
        path: "/auth",
        routes: auth_route_1.authRoutes,
    },
    {
        path: "/shop",
        routes: shop_route_1.shopRoutes,
    },
    {
        path: "/product",
        routes: product_route_1.productRoutes,
    },
    {
        path: "/category",
        routes: category_route_1.categoryRoutes,
    },
    {
        path: "/cart",
        routes: cart_route_1.cartRoutes,
    },
    {
        path: "/order",
        routes: order_route_1.orderRoutes,
    },
    {
        path: "/review",
        routes: review_route_1.reviewRoutes,
    },
    {
        path: "/coupon",
        routes: coupon_route_1.couponRoutes,
    },
    {
        path: "/contact",
        routes: contact_route_1.contactRoutes,
    },
    {
        path: "/newsletter",
        routes: newsletter_route_1.newsletterRoutes,
    },
    {
        path: "/transaction",
        routes: transaction_route_1.transactionRoutes,
    },
];
moduleRouters.forEach((route) => {
    router.use(route.path, route.routes);
});
exports.default = router;
