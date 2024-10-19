import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import homestayRoutes from "./routes/homestay.router.js";

const app= express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));

app.use('/api/homestays', homestayRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;