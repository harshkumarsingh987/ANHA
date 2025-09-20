import User from "../models/user.js";
export const getUserProfile = async (req, res) => {
  try {
    console.log(" getUserProfile called");
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    user.avatar = `http://localhost:8000/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: "Avatar updated", avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
