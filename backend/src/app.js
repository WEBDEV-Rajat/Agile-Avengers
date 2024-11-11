import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended: true, limit:"20kb"}))

app.use(express.static("public"));

app.use(cookieParser());

runRecurringTransactions();

import userRouter from "./Routes/user.routes.js";
import transactionRouter from "./Routes/transaction.routes.js"
import categoryRouter from "./Routes/category.routes.js"
import budgetRouter from "./Routes/budget.routes.js"
import savingRouter from "./Routes/saving.routes.js"
import pereatingRouter from './Routes/reoccuring.routes.js'
import { runRecurringTransactions } from "./Automation/nodeCron.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transaction",transactionRouter)
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/saving", savingRouter);
app.use("/api/v1/reoccuring", pereatingRouter);
export { app };