import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));
// for url data
app.use(express.urlencoded({extended: true, limit:"20kb"}))
// files folder store in server 
app.use(express.static("public"));
// for cookie 
app.use(cookieParser());// read nd access cookie

// routes
export { app };