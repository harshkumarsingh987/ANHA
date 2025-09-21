import React, { useState, useEffect, useRef } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Box,

  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/logo.png';
import './Navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Cart', path: '/cart' },
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
  {label: 'Profile', path: '/profile'}
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null); // <-- ref for search input
  const navigate = useNavigate();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Search handler
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <AppBar position="fixed" className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Toolbar className="navbar-toolbar">

        {/* Logo */}
        <Box component={NavLink} to="/" className="navbar-logo-box">
          <img src={logo} alt="ANha Logo" className="navbar-logo" />
        </Box>

      {/* Desktop Menu */}
<Box className="navbar-links">
  {navItems.map((item) => (
    <NavLink
      key={item.label}
      to={item.path}
     className={({ isActive }) =>
  `navbar-button ${isActive ? 'active-link' : ''}`
}

    >
      {item.label}
    </NavLink>
  ))}
</Box>

        

        {/* Search bar */}
       <Box className="navbar-extras" sx={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>

          <Box className="search-bar">
            <SearchIcon className="search-icon" 
            onClick={handleSearch} 
              style={{ cursor: 'pointer' }} />
            <InputBase
              placeholder="Search for products…"
  className="search-input"
              inputRef={searchInputRef} // <-- ref set
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress} // <-- Enter key
              onFocus={() => {
                // Mobile pe focus hote hi keyboard open hoga
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Box>

        {/* Hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } , marginLeft: 'auto'}}>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
