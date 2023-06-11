import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
    <Route exact path="/home" element={<Home/>}></Route>
    <Route exact path="/about" element={<About/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
