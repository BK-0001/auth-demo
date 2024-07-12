import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { router as authRouter } from "./routes/auth.router";
import { router as indexRouter } from "./routes/index.router";

export const app = express();

// setup ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setup layout
app.set("layout", path.join(__dirname, "views/layouts/layout"));
app.use(expressEjsLayouts);

// parse form data and the parsed data into req.body
app.use(express.urlencoded());

// setup cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["secret key1", "key1"],
    maxAge: 1000 * 60 * 30
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  next();
});

app.use(indexRouter);
app.use("/auth", authRouter);
