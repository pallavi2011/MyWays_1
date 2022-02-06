import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { setAlert } from '../../actions/alert';


const CreateBlog = () => {
    const history = useHistory();
    
    const [fileName, setFileName] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    
    const onChangeFile = e =>{
      setFileName(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('blogImage', fileName)

   
     

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post(`/api/blog`, formData);
        setAlert('Blog Created', 'success');
        setText('');
        setTitle('');
        setFileName('')
        
    }

  return ( <Fragment>
    
  <h1 className="large text-main">Create Blog</h1>
  <div className='btn'><Link to="/dashboard">Go Back to Dashboard</Link></div>
  <form className="form" onSubmit={e => onSubmit(e)} encType="multipart/form-data">
  <div className="form-group">
      <input type="file"  name="blogImage" className='form-control-file' onChange={onChangeFile}/>
    </div>
    <div className="form-group">
      <input type="text" placeholder="Edit Title" name="title" value={title}  onChange={e => setTitle(e.target.value)}/>
    </div>
    <div className="form-group">
      <textarea type="text" rows="10" cols="5" placeholder="Edit Text" name="text" value={text} onChange={e => setText(e.target.value)} />
    </div>
    <input type="submit" className="btn btn-primary" value="Create Blog" />
    
  </form>

</Fragment>)
};



export default CreateBlog;
