import './App.css';

import { useEffect, useState } from 'react';
import React from 'react';
import M from 'materialize-css'
import 'materialize-css';
import Home from './components/Home/Home';
import About from './components/Ａｂｏｕｔ/About';
import NoQuote from './components/Ｎｏ　Ｑｕｏｔｅ/NoQuote';
import WebScrape from './components/Ｗｅｂ Ｓｃｒａｐｅ/WebScrape';
import Quote from './components/Ｑｕｏｔｅ/Quote'
import Code from './components/Ｃｏｄｅ/Code'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Setting from './components/Setting/Setting'
import NumberTypingDisplaySampleText from './components/Ｎｕｍｂｅｒ/Number typing';
import FullWidthTabs from './test'




function App() {
  console.log('rendered App')
  let components = [
    <Home />,
    <About />,
    <Quote />,
    <NumberTypingDisplaySampleText />,
    <Code />,
    <WebScrape />,
    <NoQuote />,
  ]

  const [showSetting, setShowSetting] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const [setting, setSetting] = useState({})

  window.addEventListener('scroll', changeScrollBarColorByScroll)

  useEffect(() => {
    console.log('App used effect')
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
      <Header
        changeScrollBarColorByScroll={changeScrollBarColorByScroll}
        showSetting={showSetting}
        setShowSetting={setShowSetting}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab} 
        setting={setting}
        setSetting={setSetting}
        />
      <div id="pagesContainer" className="container">
        {components.map((element, i) => {
          return (<div
            key={i}
          >
            {currentTab === i && React.cloneElement(element, {
              settings: setting,
              setSettings: setSetting
            })}
          </div>)
        })}
      </div>
      <Footer />

      <Setting
        showSetting={showSetting}
        setShowSetting={setShowSetting}
        setting={setting}
        setSetting={setSetting}
      />
    </div>
  );
}



export default App;