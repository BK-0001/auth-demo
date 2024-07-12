import { Router } from "express";
import { renderLogin, renderRegister } from "../controllers/auth.controller";

export const router = Router();

router.get("/login", renderLogin);

router.get("/register", renderRegister);
