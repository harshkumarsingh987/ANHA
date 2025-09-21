import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { login } from "../controllers/authController.js";

dotenv.config();

const router = express.Router();

// @desc   Auth with Google
// @route  GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// ✅ Google Auth Callback
// @desc   Google OAuth2 Callback
// @route  GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "Lax",
    });

    // ✅ Redirect to frontend
    res.redirect("http://localhost:5173/profile");
  }
);

// @desc   Login failed
// @route  GET /auth/login/failed
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google login failed",
  });
});

// ✅ Email/Password Login
// @route POST /auth/login
router.post("/login", login);

// ✅ Logout and clear JWT cookie
// @route GET /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.redirect("http://localhost:5173");
  });
});

export default router;
