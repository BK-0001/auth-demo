import { Request, Response } from "express";

export const renderLogin = (req: Request, res: Response) => {
  res.render("login");
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("register");
};
