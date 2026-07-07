import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import configuration from "./config";
import { authRoutes } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { landLordRoutes } from "./modules/landlord/landlord.route";
import { propertyRoutes } from "./modules/properties/properties.route";
import { rentalRequestRoutes } from "./modules/rentalRequest/rentalRequest.route";
import { adminRoutes } from "./modules/admin/admin.route";

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

//categories realated routes
app.use("/api/categories",categoriesRoutes)

//property realted api for public get and other api
app.use("/api/properties",propertyRoutes)

//properties landlord related routes
app.use("/api/landlord",landLordRoutes)

//rental requst reatled api
app.use("/api/rentals",rentalRequestRoutes)

//admin routes
app.use("/api/admin",adminRoutes)





app.use(notFound)
app.use(globalErrorHandler)
export default app;
