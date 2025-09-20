import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      default: "", // For Google login users who don't have passwords
    },

    googleId: {
      type: String,
      default: "", // For form-based users who don’t use Google
    },

    avatar: {
      type: String,
      default: "", // Optional avatar URL or use default profile icon
    },

    address: {
      type: String,
      default: "",
    },

    wishlist: {
      type: [String],
      default: [],
    },

    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
      default: [],
    },
  
}, { timestamps: true });

export default mongoose.model("user", userSchema);
