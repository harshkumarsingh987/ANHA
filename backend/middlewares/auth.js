// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const authenticateUser = async(req, res, next) => {
  try {
     console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decoded.id).select("-password"); // user ID is now available in req.userId
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};
