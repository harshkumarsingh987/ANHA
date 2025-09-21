// src/pages/Profile.jsx
// src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/profile', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, {
        withCredentials: true,
      });
      window.location.href = '/login';
    } catch (err) {
      console.error('❌ Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <Box className="profile-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box className="profile-error">
        <Typography variant="h6" color="error">
          ❗ Failed to load user profile. Please log in again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="profile-container">
      <Paper elevation={3} className="profile-card">
        <Box className="profile-header">
          <Avatar
            alt={user.name}
            src={user.avatar}
            className="profile-avatar"
          />
          <Box className="profile-info">
            <Typography variant="h5" className="profile-name">{user.name}</Typography>
            <Typography className="profile-email">{user.email}</Typography>
            <Typography className="profile-joined">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box className="profile-edit-button">
            <Button variant="outlined" startIcon={<EditIcon />}>
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Divider className="profile-divider" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="profile-section">
              <Typography variant="h6" className="profile-section-title">Shipping Address</Typography>
              <Typography className="profile-section-content">
                {user.address || "No address added yet"}
              </Typography>
              <Button
                size="small"
                className="profile-edit-address"
                startIcon={<EditIcon />}
                variant="outlined"
              >
                Edit Address
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="profile-section">
              <Typography variant="h6" className="profile-section-title">Account Overview</Typography>
              <Typography className="profile-section-content">
                Orders Placed: <strong>{user.orders?.length || 0}</strong>
              </Typography>
              <Typography className="profile-section-content">
                Wishlist Items: <strong>{user.wishlist?.length || 0}</strong>
              </Typography>
              <Button
                size="small"
                className="profile-view-wishlist"
                startIcon={<FavoriteBorderIcon />}
                variant="outlined"
              >
                View Wishlist
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Divider className="profile-divider" />

        <Box className="profile-logout-button">
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
