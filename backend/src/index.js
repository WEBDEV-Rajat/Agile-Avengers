import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})

import connectDB from "./Database/ConnectDb.js";
import { app } from "./app.js";
// asynce return promise here it is db connect
connectDB()
.then(()=>{
    const port = process.env.PORT || 7000;
    // listen for errors and
    /* vks */
    app.on("error", (error)=>{
        console.log("error on port: " + error);
        throw error;
        
    })
    
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection error: " + err);
    
})

