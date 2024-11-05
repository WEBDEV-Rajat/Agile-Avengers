import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));
// for url data
app.use(express.urlencoded({extended: true, limit:"20kb"}))
// files folder store in server 
app.use(express.static("public"));
// for cookie 
app.use(cookieParser());// read nd access cookie

import userRouter from "./Routes/user.routes.js";
import transactionRouter from "./Routes/transaction.routes.js"
import categoryRouter from "./Routes/category.routes.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transaction",transactionRouter)
app.use("/api/v1/category", categoryRouter);
// routes
export { app };