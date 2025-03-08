import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { shopRoutes } from "../modules/shop/shop.route";
import { productRoutes } from "../modules/product/product.route";
import { categoryRoutes } from "../modules/category/category.route";
import { cartRoutes } from "../modules/cart/cart.route";
import { orderRoutes } from "../modules/order/order.route";
import { reviewRoutes } from "../modules/review/review.route";
import { couponRoutes } from "../modules/coupon/coupon.route";
import { contactRoutes } from "../modules/contact/contact.route";
import { newsletterRoutes } from "../modules/newsletter/newsletter.route";

const router = express.Router();

const moduleRouters = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/shop",
    routes: shopRoutes,
  },
  {
    path: "/product",
    routes: productRoutes,
  },
  {
    path: "/category",
    routes: categoryRoutes,
  },
  {
    path: "/cart",
    routes: cartRoutes,
  },
  {
    path: "/order",
    routes: orderRoutes,
  },
  {
    path: "/review",
    routes: reviewRoutes,
  },
  {
    path: "/coupon",
    routes: couponRoutes,
  },
  {
    path: "/contact",
    routes: contactRoutes,
  },
  {
    path: "/newsletter",
    routes: newsletterRoutes,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
