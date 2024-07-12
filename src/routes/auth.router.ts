import { Request, Response, Router } from "express";

export const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.get("/register", (req: Request, res: Response) => {
  res.render("register");
});
