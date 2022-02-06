import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }
  return (
     <div className='display'>
       
        <h1>Personalise your career journey with MyWays</h1>
        
        {/* <div className="buttons">
          <a href="register.html" className="btn btn-primary">Sign Up</a>
          <a href="login.html" className="btn btn-light">Login</a>
        </div> */}
      </div>
     
  
  );
};

Landing.propTypes ={
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect({mapStateToProps})(Landing)