import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";


function App() {
  return (
    <NoteState>
      <AlertState>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
      </AlertState>
    </NoteState>
  );
}

export default App;
