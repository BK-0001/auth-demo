import express from "express";
import { router as indexRouter } from "./routes/index.router";

export const app = express();

app.use(indexRouter);
