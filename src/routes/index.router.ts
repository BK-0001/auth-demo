import { Request, Response, Router } from "express";
import { validateUser } from "../middleware/validate-user";

export const router = Router();

router.get("/", validateUser, (req: Request, res: Response) => {
  res.render("index");
});
