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

  window.addEventListener('scroll', (e) => {
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let scrollY = window.scrollY;
    let footerHeight = document.querySelector('#footer').scrollHeight;

    if (scrollHeight * (scrollHeight - footerHeight - scrollY) > (clientHeight / 2 + scrollY) * clientHeight) {
      document.querySelector('body').classList.remove('bg-dark')
    } else {
      document.querySelector('body').classList.add('bg-dark')
    }
  })

  return (
    <div id="app" >
      <Header setTab={setTab} />
      <div className="container">{components[tab]}</div>
      <Footer />
      {/* <div  style={{height: "100px", width: "100px", backgroundColor: "red", position: "fixed", bottom: "-100", "zIndex": "-10"}}></div> */}
    </div>
  );
}



export default App;