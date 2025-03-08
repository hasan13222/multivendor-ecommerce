import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFoundHandler } from "./app/middleware/notFoundHandller";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// cors middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://multivendor-ecommerce-frontend-gilt.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

// json parser
app.use(express.json());

// application routes
app.use("/api", router);

// root route response
app.get("/", (req: Request, res: Response) => {
  res.send("Hello ! Welcome to Multi Vendor Ecommerce.");
});

// route not found handle
app.all("*", notFoundHandler);

// global error handler
app.use(globalErrorHandler);
export default app;
