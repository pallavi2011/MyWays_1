import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const BlogItem = ({blog}) => {
    const {title, text, date, image} = blog;
  return (
    <div className="card mb-3">
          <img src={`http://localhost:3000/uploads/${image}`} className="card-img-top" alt="..."></img>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text" >{text}</p>
              <p class="blog-date">
          Posted on <Moment format="YYYY/MM/DD" >{date}</Moment>
      </p>
          </div>
          </div>
        
   
  )
        
};

BlogItem.propTypes = {
    blog: PropTypes.object.isRequired
};

export default BlogItem;
