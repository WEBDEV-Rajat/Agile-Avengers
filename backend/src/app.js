
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import { User } from "./Models/user.model.js";

app.use(
  cors({
    origin: "https://expenseguru-black.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

app.use(
  session({
    secret: process.env.SECRET || "xbchghjdsjdghfgdsuf6dfdv4fd4b8fg",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("Profile ID:", profile.id);
        // console.log("Email from profile:", profile.emails?.[0]?.value);

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails?.[0]?.value || "" });
          if (user) {
            console.log("User found by email, updating googleId");
            user.googleId = profile.id;
            await user.save();
          } else {
            console.log("Creating new user");
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || "",
              image: profile.photos?.[0]?.value || "",
            });
            await user.save();
          }
        }

        // console.log("User authenticated:", user);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return done(null, { user, accessToken, refreshToken });
      } catch (error) {
        console.error("Error in Google OAuth strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data);
});
passport.deserializeUser((data, done) => {
  done(null, data);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.cookie("accessToken", req.user.accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", req.user.refreshToken, { httpOnly: true, secure: true });
    res.redirect("http://localhost:3000/dashboard");
  }
);

app.get("/login/success", async (req, res) => {
  if (req.user) {
    return res.status(200).json({ message: "User logged in", user: req.user.user });
  } else {
    return res.status(401).json({ message: "Not Authorized", user: {} });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("http://localhost:3000");
  });
});

import userRouter from "./Routes/user.routes.js";
import transactionRouter from "./Routes/transaction.routes.js";
import categoryRouter from "./Routes/category.routes.js";
import budgetRouter from "./Routes/budget.routes.js";
import savingRouter from "./Routes/saving.routes.js";
import pereatingRouter from "./Routes/reoccuring.routes.js";
import analysisRouter from "./Routes/analysis.routes.js"
import contactRouter from "./Routes/contactus.routes.js"
import { runRecurringTransactions } from "./Automation/nodeCron.js";

runRecurringTransactions();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/saving", savingRouter);
app.use("/api/v1/reoccuring", pereatingRouter);
app.use("/api/v1/analysis",analysisRouter);
app.use("/api/v1/contact",contactRouter)
export { app };
