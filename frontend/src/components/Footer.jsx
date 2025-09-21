// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#111', color: '#fff', mt: 4, py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              ANHA
            </Typography>
            <Typography variant="body2">
              Your style, your identity. Discover premium quality clothing with ANha.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="/about" color="inherit" underline="hover" display="block">
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">
              Contact
            </Link>
            <Link href="/careers" color="inherit" underline="hover" display="block">
              Careers
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="/faq" color="inherit" underline="hover" display="block">
              FAQ
            </Link>
            <Link href="/returns" color="inherit" underline="hover" display="block">
              Returns
            </Link>
            <Link href="/shipping" color="inherit" underline="hover" display="block">
              Shipping
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://instagram.com" target="_blank" rel="noopener" color="inherit" underline="hover" display="block">
              Instagram
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener" color="inherit" underline="hover" display="block">
              Facebook
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener" color="inherit" underline="hover" display="block">
              Twitter
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: '#555' }} />

        <Typography variant="body2" color="gray" align="center">
          © {new Date().getFullYear()} ANha Clothing. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
