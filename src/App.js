import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home';
import About from './components/Ａｂｏｕｔ/About';
import NoQuote from './components/Ｎｏ　Ｑｕｏｔｅ/NoQuote';
import Header from './components/Header';
import Footer from './components/Footer';
import NumberTyping from './components/Ｎｕｍｂｅｒ/Number typing';
import Row from 'react-bootstrap/Row';


function App() {
  const [tab, setTab] = useState(0);

  let components = [
    <Home />,
    <About />,
    <NoQuote />,
    <NumberTyping />
  ]

  return (
    <div>
      <Header setTab={setTab} />
      {components[tab]}
      <Footer />
    </div>
  );
}



export default App;