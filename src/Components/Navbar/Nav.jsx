import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">FireAuth</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal flex gap-24 px-1">
             <Link to='/'>Home</Link>
             <Link to='/register'>Register</Link>
             <Link to='/heroRegister'>Hero Register</Link>
             <Link to='/login'>Login</Link>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Nav;