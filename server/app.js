import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import homestayRoutes from "./routes/homestay.router.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app= express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/homestays', homestayRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;