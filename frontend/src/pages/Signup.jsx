// src/pages/Signup.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png'; // Replace with your actual logo path
import './Signup.css'; // Import the Signup specific CSS
const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Simulate signup logic
      if (email === 'test@example.com') {
        setError('User already exists');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError('Signup failed. Try again later.');
    }
  };

  return (
    <div className="signup-container">
      <Container maxWidth="sm">
        <Paper elevation={3} className="signup-paper">
          <div className="logo-container">
            <img src={logo} alt="ANha Logo" className="signup-logo" />
          </div>
          <Typography variant="h5" align="center" gutterBottom>
            Create Your ANHA Account
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="signup-button"
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" align="center" className="login-redirect">
            Already have an account?{' '}
            <span
              className="login-link"
              onClick={() => navigate('/login')}
            >
              Log in
            </span>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
