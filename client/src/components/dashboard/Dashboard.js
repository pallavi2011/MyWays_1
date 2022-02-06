import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getBlogs} from '../../actions/blog';
import {Link, Redirect} from 'react-router-dom';
import Blogs from './Blogs';

const Dashboard = ({getBlogs, auth:{loading}, blog:{blogs}}) => {
    
    useEffect(() => {
        getBlogs();
    }, [getBlogs]);
   
  return loading && blogs === {} ? <Fragment>No Blogs Found</Fragment> : 
  <Fragment>

       <div class="row row-cols-3 row-cols-md-2">
       {blogs.map((blog, index) => (
            <Blogs key={blog._id} blog={blog}/>
         ))}
      
    </div>
      </Fragment>
};

Dashboard.propTypes ={
    getBlogs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    blog: state.blog
})


export default connect(mapStateToProps, {getBlogs})(Dashboard);
