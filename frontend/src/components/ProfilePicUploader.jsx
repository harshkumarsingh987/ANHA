import React, { useState } from "react";
import { Avatar, Button, Box } from "@mui/material";
import axios from "axios";

const ProfilePicUploader = ({ avatar, setAvatar }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("http://localhost:8000/api/users/upload-avatar", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAvatar(res.data.avatar);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="contained" onClick={uploadAvatar}>Upload</Button>
    </Box>
  );
};

export default ProfilePicUploader;
