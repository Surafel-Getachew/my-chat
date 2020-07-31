import React from "react";
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to = "/">MY-chat</Link>
      <div className = "collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link className = "nav-link" to = "/dashboard">Dashboard</Link>
          </li>
        </ul>
        <ul className = "naav navbar-nav ml-auto">
            <li className = "nav-item">
                <Link className = "nav-link" to = "/signup">signUp</Link>
            </li>
            <li className = "nav-item">
                <Link className = "nav-link" to = "/signin">signIn</Link>
            </li>
            <li className = "nav-item">
                <Link className = "nav-link" to = "/signout">signOut</Link>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
