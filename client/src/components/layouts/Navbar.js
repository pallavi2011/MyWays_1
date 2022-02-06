import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Guest from './Guest';
import Admin from './Admin';
 const Navbar = ({auth:{isAuthenticated, loading, token,  user:{user}},logout}) => {
   
   const authLinks =(
    <ul>
    <li><a href="/register">Register</a></li>
    <li><a href="/login">Login</a></li>
    </ul>
   )
  
  return (
    <nav className="navbar bg-light">
        
        <h1><a href="/">WanderLust</a>
        </h1>
        <Fragment>
          {!user && authLinks}
          {isAuthenticated && user.role === 0 && <Guest logout={logout}/>}{isAuthenticated &&user.role === 1 && <Admin logout={logout}/>}
        </Fragment> 
  </nav>
  );
};
Navbar.propTypes ={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth

})
export default connect(mapStateToProps, {logout})(Navbar);