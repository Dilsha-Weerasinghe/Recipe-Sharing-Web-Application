import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, HeartIcon } from '@heroicons/react/outline';
import { UtensilsCrossed, ForkKnife, Home, Info, CookingPot } from 'lucide-react';
import { TfiWrite } from 'react-icons/tfi';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (location.pathname === '/recipes') {
        
        navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`, { replace: true });
      } else {
        navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <UtensilsCrossed size={24} strokeWidth={2} className="logo-icon" />
          <span className="navbar-logo-text">Foodie</span>
        </Link>
      </div>

      
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>

      
      <div className="navbar-right">
        <Link to="/" className="icon-button">
          <Home className="icon" />
          <span>Home</span>
        </Link>

        <Link to="/about" className="icon-button">
          <Info className="icon" />
          <span>About</span>
        </Link>

        <Link to="/recipes" className="icon-button">
          <CookingPot className="icon" />
          <span>Recipes</span>
        </Link>

        <Link to="/my-recipes" className="icon-button">
          <ForkKnife className="icon" />
          <span>Your Recipes</span>
        </Link>

        <Link to="/create" className="icon-button">
          <TfiWrite className="icon" />
          <span>Create</span>
        </Link>

        <Link to="/favorites" className="icon-button">
          <HeartIcon className="icon" />
          <span>Favorites</span>
        </Link>

        {/*Dropdown menu */}
        <div className="profile-dropdown">
          <button className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <UserCircleIcon className="icon" />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                </>
              ) : (
                <>
                  <div className="user-name">Hi, {user.name}</div>
                  <button onClick={() => { logout(); setDropdownOpen(false); }}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      
      <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      
      <div className={`mobile-dropdown-menu ${mobileMenuOpen ? 'active' : ''}`}>
        
        <form onSubmit={handleSearchSubmit} className="mobile-search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={(e) => e.stopPropagation()}
          />
        </form>

        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>
          <Home className="icon" />
          <span>Home</span>
        </Link>

        <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>
          <Info className="icon" />
          <span>About Us</span>
        </Link>

        <Link to="/recipes" className="nav-link" onClick={toggleMobileMenu}>
          <CookingPot className="icon" />
          <span>Recipes</span>
        </Link>

        <Link to="/my-recipes" className="nav-link" onClick={toggleMobileMenu}>
          <ForkKnife className="icon" />
          <span>Your Recipes</span>
        </Link>

        <Link to="/create" className="nav-link" onClick={toggleMobileMenu}>
          <TfiWrite className="icon" />
          <span>Create</span>
        </Link>

        <Link to="/favorites" className="nav-link" onClick={toggleMobileMenu}>
          <HeartIcon className="icon" />
          <span>Favorites</span>
        </Link>
        
        
        <div className="mobile-auth-links">
          {!user ? (
            <>
              <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="nav-link" onClick={toggleMobileMenu}>
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <button className="nav-link" onClick={() => { logout(); toggleMobileMenu(); }}>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;