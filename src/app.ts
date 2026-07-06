import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import configuration from "./config";
import { authRoutes } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app: Application = express();
//cors setup
app.use(
  cors({
    origin: configuration.app_url,
    credentials: true,
  }),
);
//default middleware setup

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//default get
app.get("/", (req: Request, res: Response) => {
  res.send("Next level assignment 4 and Rent nest server is running");
});

//main setup routes start

//auth realted routes
app.use("/api/auth", authRoutes);



app.use(notFound)
app.use(globalErrorHandler)
export default app;
