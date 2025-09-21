import React, { useState } from 'react';
import {
   TextField,
  Button,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment

} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

const Loginpage = () => {
  const navigate = useNavigate();
 
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
     // After successful login
    navigate("/", { state: { showSnackbar: true } });
    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include uppercase, lowercase, number, and a special character');
      return;
    }

      try {
      // Temporary login logic (replace with real backend call)
      if (email === 'test@example.com' && password === 'Test@1234') {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Try again later.');
    }
  };
    // ✅ Google login trigger
  const googleLogin = () => {
    window.open('http://localhost:8000/auth/google', '_self');
  };
  return (
    <div className="login-container">
      <Container maxWidth="sm">
        <Paper elevation={3} className="login-paper">
          <div style={{ textAlign: 'center' }}>
            <img src={logo} alt="ANha Logo" className="login-logo" />
          </div>

          {error && <Typography className="login-error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              className="login-input"
               margin="normal"
              required
            />

            <TextField
              label="Password"
              name="password"
             type={showPassword ? 'text' : 'password'}
              fullWidth
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
            >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="login-btn"
            >
              Login
            </Button>
          </form>

          <Typography  variant="body2" align="center" className="login-redirect">
            Don’t have an account?{' '}
            <span 
            className="login-link"
            onClick={() => navigate('/signup')}>Sign up</span>
          </Typography>
        {/* ✅ Google Auth Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
  onClick={googleLogin}
  className="google-login-btn"
  fullWidth
>
  <img
    src={require('../assets/google-icon.png')}
    alt="Google"
    className="google-icon"
  />
  <span className="google-login-text"><h4>Sign in with Google</h4></span>
</Button>

          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Loginpage;
