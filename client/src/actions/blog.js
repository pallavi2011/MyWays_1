import axios from 'axios';
import { setAlert } from './alert';
import {GET_BLOGS, BLOG_ERROR, UPDATE_LIKES, GET_BLOG, ADD_COMMENT, REMOVE_COMMENT, EDIT_BLOG, DELETE_BLOG} from './types';


export const getBlogs = () => async dispatch => {
    try {
        const res = await axios.get('/api/blog');
        dispatch({
            type: GET_BLOGS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}

export const getBlogById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/blog/${id}`);
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}

// Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/blog/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}


// Remove Like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/blog/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}

// Add comment on a blog
export const addComment = (blogId, formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/blog/comment/${blogId}`, formData);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}


// Delete comment on a blog
export const removeComment = (blogId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/blog/comment/${blogId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Removed Comment', 'success'));
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}



//Edit Blog
export const editBlog = (blogId, formData) => async dispatch => {
    try {
        const res = await axios.patch(`/api/blog/edit/${blogId}`, formData);
        dispatch({
            type: EDIT_BLOG,
            payload: res.data
        });
        dispatch(setAlert('Blog Edited', 'success'));
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }
}


// Delete blog
export const deleteBlog = id => async dispatch => {
    try {
        const blog = await axios.delete(`/api/blog/${id}`);
        dispatch({
            type: DELETE_BLOG,
            payload: blog.msg
        });
        dispatch(setAlert('Blog Deleted', 'danger'));
    } catch (error) {
        dispatch({
            type: BLOG_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}