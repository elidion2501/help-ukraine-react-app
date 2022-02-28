import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MainNavigation = (props) => {
  const isLogin = useSelector((state) => state.auth.login);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className=" navbar-collapse container" id="navbarNav">
          <div className="row col-12">
            <ul
              className="navbar-nav text-center col-xxl-8 col-xl-6"
              style={{ justifyContent: "center !important", paddingRight:'0' }}
            >
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Головна
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars/need">
                  Перевезення
                </Link>
              </li>
            </ul>
            {/* {!isLogin && (
              <ul className="navbar-nav text-center col-xxl-4 col-xl-5 align-self-end">
                <li className="nav-item  offset-xxl-9 offset-xl-6 ">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signUp">
                    SignUp
                  </NavLink>
                </li>
              </ul>
            )} */}
            {/* {isLogin && (
              <ul className="navbar-nav text-center col-xxl-4 col-xl-5 align-self-end">
                <li className="nav-item  offset-xxl-9 offset-xl-6 ">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            )} */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
