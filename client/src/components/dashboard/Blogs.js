import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';


const Blogs = ({auth, blog:{_id, title, text, name, image, likes, comments, date}}) => {
  return <div class="col mb-4">
  <div className="card text-center">
  <img className="card-img-top" src={`http://localhost:3000/uploads/${image}`}  alt="..."></img>
  <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text overflow">{text}</p>
      <Link to={`/blog/${_id}`} className="card-link">Read More...</Link>
      {auth.user.user.role === 1 ? (
        <Link to={{
            pathname: `/blog/edit/${_id}`,
            state: {
                blogtitle: title,
                text: text,
                blogimage: image
            }}} className="card-link">Edit/Delete</Link>
      ): null
      }
      
  </div>
  </div>
  </div>
};

Blogs.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps)(Blogs);
