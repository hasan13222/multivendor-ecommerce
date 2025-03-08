import express from "express";
import { newsletterController } from "./newsletter.controller";

const router = express.Router();

router.post("/", newsletterController.createNewsletter);

export const newsletterRoutes = router;
