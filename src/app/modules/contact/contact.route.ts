import express from "express";
import { contactController } from "./contact.controller";

const router = express.Router();

router.post("/", contactController.createContact);

export const contactRoutes = router;
