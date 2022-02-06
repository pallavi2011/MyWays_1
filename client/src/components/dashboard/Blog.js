import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getBlogById } from '../../actions/blog';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import BlogItem from './BlogItem';

const Blog = ({getBlogById, blog, match}) => {

  useEffect(() => {
    getBlogById(match.params.id);
  }, [getBlogById]);


  const {_id, comments, likes} = blog.blog;
  return (
      <Fragment>
       
    <section className='container'>
        <div className='btn btn-gap'><Link to="/dashboard">Go Back</Link></div>
        <BlogItem blog={blog.blog} showActions={false}/>
        <CommentForm blogId={_id}/>
        {comments && comments.map(comment => (
          <CommentItem blogId={_id} comment={comment}/>
        ))}
        
        

        </section>
  </Fragment>)
};

Blog.propTypes = {
  getBlogById: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  
  blog: state.blog

})
export default connect(mapStateToProps, {getBlogById})(Blog);
