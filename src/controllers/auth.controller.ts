import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { users } from "../models/user";

export const renderLogin = (req: Request, res: Response) => {
  res.render("login");
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("register");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.render("login");
    return;
  }

  req.session = { currentUser: { id: user.id, email } };

  res.redirect("/");
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (user) {
    res.render("register");
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.redirect("/");
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;

  res.redirect("/auth/login");
};
