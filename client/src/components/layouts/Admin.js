import React from 'react';
import {Link} from 'react-router-dom';

const Admin = ({logout}) => {
  return <div>
    <ul>
     <li>
       <label>Admin</label>
     </li>
     <li>
       <Link to="/createblog">Create Blog</Link>
     </li>
     <li>
       <a onClick={logout} href="/logout">
           <i className="fas fa-sign-out-alt"></i>{' '}
           <span className="hide-sm">Logout</span></a>
     </li>
   </ul>
  </div>;
};

export default Admin;