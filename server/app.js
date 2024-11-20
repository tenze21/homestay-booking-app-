import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import homestayRoutes from "./routes/homestay.router.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/upload.homestay.route.js";
import reservationRoutes from "./routes/reservation.router.js";
import profileUpdateRoute from "./routes/upload.user.route.js";
import homestayImageUpdateRoute from "./routes/imageUpdate.homestay.route.js";
import reviewRoutes from "./routes/review.router.js";
import { getExhangeRate } from "./controllers/reservation.controller.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("uploads"));

app.use("/api/homestays", homestayRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/homestay/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.get("/api/currencyexchange", getExhangeRate);
app.use("/api/user/upload", profileUpdateRoute);
app.use("/api/homestay", homestayImageUpdateRoute);
app.use("/api/reviews", reviewRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static("var/data/uploads"));
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

app.use(notFound);
app.use(errorHandler);

export default app;
