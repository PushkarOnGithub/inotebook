import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const Login = () => {
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem("authToken", json.authToken);
      console.log("Login")
      console.log(json.authToken);
      navigate("/");
      showAlert("Logged In SuccessFully", "success");
    }
    else{
      showAlert("Invalid Details", "danger");
    }
    // console.log(json);
  };
  return (
    <div className="container" style={{ width: "45%" }}>
      <form onSubmit={handleLogIn}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            placeholder="Enter Your email"
            onChange={onChange}
            value={credentials.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
