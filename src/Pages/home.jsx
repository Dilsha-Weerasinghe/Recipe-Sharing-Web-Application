import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to <span className="highlight">Foodie</span></h1>
        <p>Simple recipes made for real, actual, everyday life.</p>
        <div className="button-container">
          <Link to="/Recipes" className="browse-btn2">See Them All</Link>
        </div>
      </div>
    </div>
  );
}
