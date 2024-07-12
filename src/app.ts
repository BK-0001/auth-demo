import express from "express";
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

app.use(indexRouter);
app.use("/auth", authRouter);
