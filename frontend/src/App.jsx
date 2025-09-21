// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Homepage from './pages/Home';
import Loginpage from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Products from './pages/Products';
// import NotFound from './pages/NotFound';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';

// Wrapper to allow useLocation inside
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  // Extracting query param: showSnackbar=true
  const searchParams = new URLSearchParams(location.search);
  const showSnackbar = searchParams.get('showSnackbar') === 'true';

  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: '80vh',
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Homepage showSnackbar={showSnackbar} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default AppWrapper;
