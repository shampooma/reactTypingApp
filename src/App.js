import './App.css';
import { useState } from 'react';
import React from 'react';
import Home from './components/Home';
import About from './components/Ａｂｏｕｔ/About';
import NoQuote from './components/Ｎｏ　Ｑｕｏｔｅ/NoQuote';
import Header from './components/Header';
import Footer from './components/Footer';
import NumberTyping_displaySampleText from './components/Ｎｕｍｂｅｒ/Number typing';


function App() {
  const [tab, setTab] = useState(0);

  let components = [
    <Home />,
    <About />,
    <NoQuote />,
    <NumberTyping_displaySampleText />
  ]

  return (
    <div style={{backgroundImage: "url(/tanner-geringer-zSOWQufnxX0-unsplash.jpg)" }}>
      <Header setTab={setTab} />
      <div className="container">{components[tab]}</div>
      <Footer />
    </div>
  );
}



export default App;