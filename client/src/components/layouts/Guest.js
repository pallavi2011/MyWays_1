import React from 'react';

const Guest = ({logout}) => {
  return <div>
    <ul>
     <li>
       <label>Guest</label>
     </li>
     <li>
     <a onClick={logout} href="/logout">
           <i className="fas fa-sign-out-alt"></i>{' '}
           <span className="hide-sm">Logout</span></a>
     </li>
   </ul>
  </div>;
};

export default Guest;
