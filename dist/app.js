"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFoundHandller_1 = require("./app/middleware/notFoundHandller");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// cors middleware
const corsOptions = {
    origin: ["http://localhost:5173", "https://multivendor-ecommerce-frontend-gilt.vercel.app"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// json parser
app.use(express_1.default.json());
// application routes
app.use("/api", routes_1.default);
// root route response
app.get("/", (req, res) => {
    res.send("Hello ! Welcome to Multi Vendor Ecommerce.");
});
// route not found handle
app.all("*", notFoundHandller_1.notFoundHandler);
// global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
