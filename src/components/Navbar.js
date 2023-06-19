import React,{useContext} from "react";
import logo from "../logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
  const notecontext = useContext(noteContext);
  const {emptyNotes} = notecontext;
  const navigate = useNavigate();
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
    emptyNotes();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Bootstrap
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  } mx-2`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/notes" ? "active" : ""
                  } mx-2`}
                  aria-current="page"
                  to="/notes"
                >
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  } mx-2`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="container" style={{"textAlign": "end"}}>
          {!localStorage.getItem("authToken")?(<>
              <Link role="button" className="btn btn-primary mx-1 " to="/login">LogIn</Link>
              <Link role="button" className="btn btn-primary mx-1" to="/signup">SignUp</Link></>)
        :<button className="btn btn-primary mx-1" onClick={handleLogout}>LogOut</button>}
        </div>
    </div>
    </div>
      </nav>

    </>
  );
};

export default Navbar;
