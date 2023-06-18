import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const SignUp = () => {
  const context = useContext(alertContext);
  const {showAlert} = context;
  const navigate = useNavigate();
  // const showAlert = context.showAlert;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(json.authToken);
      navigate("/");
      showAlert("Account Created SuccessFully", "success");
    }
    
  };
  return (
    <div className="container" style={{ width: "45%" }}>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            onChange={onChange}
            required
            minLength={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            placeholder="Enter Your email"
            onChange={onChange}
            required
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
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputConfirmPassword1"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            required
            minLength={5}
            
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
