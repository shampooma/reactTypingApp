import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Gear } from 'react-bootstrap-icons';
import './Header.css';

let collapsed;
let mobileLayout;


const Header = (props) => {
    console.log('Header rendered')

    const [originColor, setOriginColor] = useState(true);
    const [displayMobileLayout, setDisplayMobileLayout] = useState(false);

    const { changeScrollBarColorByScroll, showSetting, setShowSetting, currentTab, setCurrentTab, setting, setSetting } = props;

    useEffect(() => {
        console.log('Header used effect')
        collapsed = true;
        mobileLayout = false;

        if (window.innerWidth < 992) {
            mobileLayout = true
            setDisplayMobileLayout(true);
        }

        changeHeaderBackgroundWithoutUsingHambergar()

        document.addEventListener('mousedown', closeHeader)
        document.addEventListener('touchstart', closeHeader)

        window.addEventListener('scroll', () => {
            changeHeaderBackgroundWithoutUsingHambergar()
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth < 992 && !mobileLayout) {
                mobileLayout = true
                setDisplayMobileLayout(true);
                changeHeaderBackgroundWithoutUsingHambergar()
            } else if (window.innerWidth >= 992 && mobileLayout) {
                if (window.scrollY <= 0) {
                    setOriginColor(true)
                }
                mobileLayout = false
                setDisplayMobileLayout(false);
            }
        })
    }, [])


    function toggleCollapseButtonOnClick(currentTabNumber) {
        if (window.scrollY <= 0 && !collapsed) {
            setOriginColor(true)
        } else {
            setOriginColor(false)
        }

        collapsed = !collapsed
    }


    function changeHeaderBackgroundWithoutUsingHambergar() {
        if (window.scrollY <= 0 && collapsed) {
            setOriginColor(true)
        } else {
            setOriginColor(false)
        }
    }

    function closeHeader(e) {
        if (!e.target.classList.contains('headermain') && !document.querySelector('.headermain').contains(e.target) && !collapsed && mobileLayout) {
            document.querySelector('#toggleCollapseButton').click()
        }
    }

    function changeTab(e, n) {

        if (!collapsed && mobileLayout) {
            document.querySelector('#toggleCollapseButton').click()
        }
        console.log(e.target.innerText)

        if (e.target.innerText == "Setting") {
            setShowSetting(!showSetting)
        } else {
            setCurrentTab(n + 1)
        }
        changeScrollBarColorByScroll();
    }
    return (
        <div style={{ height: "70px" }}>
            <Navbar
                className={"headermain" + (originColor ? "" : " navbar-dark bg-dark")}
                id="navbar"
                fixed="top"
                collapseOnSelect
                expand="lg"
                style={{ zIndex: 1, padding: `0 0 ${mobileLayout ? "5px" : "2px"} 0`, }}>
                <Nav
                    style={{ width: "100%" }}>
                    <Row
                        className="justify-content-lg-between  "
                        style={{ width: "100%", margin: "0" }}>
                        <Col
                            xs={12}
                            lg={2}
                            style={{ marginBottom: mobileLayout ? "10px" : "0", paddingTop: mobileLayout ? "10px" : "0" }}>
                            <div
                                className="d-flex justify-content-between">
                                <Navbar.Brand
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => changeTab(null, -1)}> Home</Navbar.Brand>
                                <Navbar.Toggle
                                    id="toggleCollapseButton"
                                    onClick={() => toggleCollapseButtonOnClick(currentTab)}
                                    aria-controls="responsive-navbar-nav" />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            lg={8}>
                            <div
                                className="d-flex flex-column flex-lg-row justify-content-center"
                                style={{ width: "100%" }}>
                                <Tabs
                                    style={{ ...(displayMobileLayout && { display: "none" }) }}
                                    classes={{
                                        indicator: (originColor ? "indicatorOrigin" : "indicatorNonOrigin")
                                    }}
                                    value={currentTab > 0 && currentTab - 1}
                                    onChange={changeTab}
                                    variant="scrollable"
                                    scrollButtons="auto">
                                    {['About', 'English Typing', 'Number Typing', 'Code Typing', 'Web Scrap Typing', 'No Quote'].map((string, i) => {
                                        return (
                                            <Tab
                                                key={i}
                                                style={{
                                                    color: (() => {

                                                        if (originColor) {
                                                            return "#000000"
                                                        } else {
                                                            return "#ffffff"
                                                        }

                                                    })(),
                                                    textTransform: "none"
                                                }}
                                                classes={{
                                                    root: (displayMobileLayout && "tabButtonNonOrigin"),
                                                    wrapper: (displayMobileLayout && "tabLabelNonOrigin")
                                                }}
                                                label={string}
                                            />)
                                    })}
                                </Tabs>
                            </div>

                            <Navbar.Collapse
                                id="responsive-navbar-nav">
                                <Tabs
                                    orientation="vertical"
                                    style={{ width: "100%", ...(!displayMobileLayout && { display: "none" }) }}
                                    classes={{
                                        indicator: (originColor ? "indicatorOrigin" : "indicatorNonOrigin")
                                    }}
                                    value={currentTab > 0 && currentTab - 1}
                                    onChange={changeTab}
                                    variant="scrollable"
                                    scrollButtons="auto">
                                    {['About', 'English Typing', 'Number Typing', 'Code Typing', 'Web Scrap Typing', 'No Quote', 'Setting'].map((string, i) => {
                                        return (
                                            <Tab
                                                key={i}
                                                style={{
                                                    color: (() => {
                                                        if (originColor) {
                                                            return "#00000000"
                                                        } else {
                                                            return "#ffffff"
                                                        }
                                                    })(),
                                                    textTransform: "none"
                                                }}
                                                classes={{
                                                    root: (displayMobileLayout && "tabButtonNonOrigin"),
                                                    wrapper: (displayMobileLayout && "tabLabelNonOrigin")
                                                }}
                                                label={string}
                                            />)
                                    })}
                                </Tabs>
                            </Navbar.Collapse>
                        </Col>
                        <Col xs={0} lg={2} className="d-flex align-items-center justify-content-end">
                            {/* Show only when is not mobile layout */}
                            {displayMobileLayout ? null : <Gear style={{ cursor: "pointer" }} onClick={() => {
                                setShowSetting(!showSetting)
                            }} />}

                        </Col>
                    </Row>
                </Nav>
            </Navbar>
        </div >)
}

export default Header;