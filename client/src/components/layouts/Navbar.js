import React from 'react';
import {Link} from 'react-router-dom';

 const Navbar = () => {
  return (
    <nav className="navbar bg-light">
        
        <h1><a href="/">MyWays</a>
        </h1>
        <ul>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
        </ul>
  </nav>
  );
};

export default Navbar;