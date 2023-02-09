import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Search from "./Search";

const Header = () => {
  const state = useSelector((state) => state.auth.user);
  //console.log("state", state);
  const token = state?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutUser({ toast, navigate }));
  };
  if (token) {
    var decoded = jwt_decode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      dispatch(logOutUser({ toast, navigate }));
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand me-2" to="/">
          Tour App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {state?.user?._id && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    Add Tour
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${state?.user?._id}`}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            <Search />
            {state?.user?._id ? (
              <>
                <p className="mb-0">
                  Login as:{" "}
                  <Link to={`/user/${state?.user?._id}`}>
                    {state?.user?.username}
                  </Link>
                </p>
                <button
                  type="button"
                  className="btn btn-link px-3 me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-link px-3 me-2"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
