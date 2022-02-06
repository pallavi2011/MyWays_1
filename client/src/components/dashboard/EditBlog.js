import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { getBlogById } from '../../actions/blog';
import { editBlog, deleteBlog } from '../../actions/blog';
import { setAlert } from '../../actions/alert';
import axios from 'axios';

const EditBlog = ({getBlogById, match, blog:{blog}}) => {
    const history = useHistory();
    useEffect(() => {
            getBlogById(match.params.id)
    }, [getBlogById]);
    
    const [fileName, setFileName] = useState('');
    const [title, setTitle] = useState(blog.title);
    const [text, setText] = useState(blog.text);
    
    const onChangeFile = e =>{
      setFileName(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('blogImage', fileName)

   
     

    const onEdit = async e => {
        e.preventDefault();
        const res = await axios.patch(`/api/blog/edit/${match.params.id}`, formData);
        // editBlog(match.params.id, formData);
        setAlert('Blog Updated', 'success');
        history.push('/dashboard');
    }

    const onDelete = async e => {
          e.preventDefault();
          const res = await axios.delete(`/api/blog/${match.params.id}`);
        // editBlog(match.params.id, formData);
          setAlert('Blog Deleted', 'danger');
          history.push('/dashboard');
        }
        

  return ( <Fragment>
    
  <h1 className="large text-main">Edit Blog</h1>
  <div className='btn'><Link to="/dashboard">Go Back to Dashboard</Link></div>
  <form className="form" encType="multipart/form-data">
  <div className="form-group">
      <img src={`http://localhost:3000/uploads/${blog.image}`} style={{width: '500px', height:'200px'}}></img>
      <input type="file"  name="blogImage" className='form-control-file' onChange={onChangeFile}/>
    </div>
    <div className="form-group">
      <input type="text" placeholder="Edit Title" name="title" value={title}  onChange={e => setTitle(e.target.value)}/>
    </div>
    <div className="form-group">
      <textarea type="text" rows="10" cols="5" placeholder="Edit Text" name="text" value={text} onChange={e => setText(e.target.value)} />
    </div>
    <input type="submit" onClick={e => onEdit(e)} className="btn btn-primary" value="Edit" />
    <input type="submit" onClick={e => onDelete(e)} className="btn btn-primary" value="Delete" />
  </form>

</Fragment>)
};

EditBlog.propTypes = {
    getBlogById: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    editBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, {getBlogById, editBlog})(EditBlog);
