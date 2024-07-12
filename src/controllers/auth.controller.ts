import { Request, Response } from "express";
import { users } from "../models/User";

export const renderLogin = (req: Request, res: Response) => {
  res.render("login");
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("register");
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    res.render("login");
    return;
  }

  res.redirect("/");
};

export const register = (req: Request, res: Response) => {};
