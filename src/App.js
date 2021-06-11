import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home';
import About from './components/Ａｂｏｕｔ/About';
import Contact from './components/Ｎｏ　Ｑｕｏｔｅ/Contact';
import Header from './components/Header';
import Row from 'react-bootstrap/Row'


function App() {
  const [tab, setTab] = useState(0);

  let components = [
    <Home />,
    <About />,
    <Contact />
  ]

  return (
    <div>
      <Header setTab={setTab} />
      {components[tab]}
    </div>
  );
}



export default App;