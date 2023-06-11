import React from 'react'
import logo from "../logo.svg"
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand " to="/home">
      <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
       Bootstrap
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item ">
          <Link className="nav-link active mx-2" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  mx-2" to="/notes">Notes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  mx-2" to="/about">About</Link>
        </li>
      </ul>
  </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;