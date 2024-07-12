import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { users } from "../models/user";

export const renderLogin = (req: Request, res: Response) => {
  res.render("auth", { title: "Login", email: "", password: "" });
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("auth", { title: "Register" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.render("auth", {
      error: "Invalid Email or Password",
      title: "Login",
      email,
      password
    });
    return;
  }

  req.session = { currentUser: { id: user.id, email } };

  res.redirect("/");
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (user) {
    res.render("auth", { title: "Register", error: "email in use" });
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
