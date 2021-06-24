import './App.css';

import { useEffect } from 'react';
import React from 'react';
import M from 'materialize-css'
import 'materialize-css';
import Home from './components/Home';
import About from './components/Ａｂｏｕｔ/About';
import NoQuote from './components/Ｎｏ　Ｑｕｏｔｅ/NoQuote';
import Header from './components/Header';
import Footer from './components/Footer';
import NumberTypingDisplaySampleText from './components/Ｎｕｍｂｅｒ/Number typing';

function App() {
  let components = [
    <Home />,
    <About />,
    <NoQuote />,
    <NumberTypingDisplaySampleText />
  ]

  window.addEventListener('scroll', changeScrollBarColorByScroll)

  useEffect(() => {
    changeScrollBarColorByScroll()
    M.Tabs.init(document.querySelector('.tabs'));
  }, [])

  function changeScrollBarColorByScroll() {
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let scrollY = window.scrollY;
    let footerHeight = document.querySelector('#footer').scrollHeight;

    if ((scrollHeight * (scrollHeight - footerHeight - scrollY) > (clientHeight / 2 + scrollY) * clientHeight) || scrollY < 0) {
      document.querySelector('body').classList.remove('bg-dark')
    } else {
      document.querySelector('body').classList.add('bg-dark')
    }
  }

  return (
    <div id="app">
      <Header changeScrollBarColorByScroll={changeScrollBarColorByScroll} />
      <div id="pagesContainer" className="container">
        {components.map((element, i) => {
          return (<div key={i} className={i !== 0 ? "notCurrentTab" : ""}>
            {element}
          </div>)
        })}
      </div>
      <Footer />
    </div>
  );
}



export default App;