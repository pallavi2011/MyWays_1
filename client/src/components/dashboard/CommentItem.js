import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { removeComment } from '../../actions/blog';
import Moment from 'react-moment';

const CommentItem = ({blogId, comment:{_id, text, name, user, date}, auth, removeComment}) => {

  return (
    <div class="post bg-white p-1 my-1">
    <div>
        <h7>{name}</h7>
    </div>
    <div>
      <p class="my-1">
       {text}
      </p>
       <p class="blog-date">
          Posted on <Moment format="YYYY/MM/DD" >{date}</Moment>
      </p>
      {!auth.loading && user === auth.user.user._id && (
          <button onClick={e => removeComment(blogId, _id)} type="button" className='btn btn-danger'>
              <i className="fas fa-times"></i>
          </button>
      )}
    </div>
  </div>
)
};

CommentItem.propTypes = {
    blogId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {removeComment})(CommentItem);
