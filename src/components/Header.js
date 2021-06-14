import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles";
import './Header.css';

let collapsed;
let mobileLayout;

const styles = theme => ({
    indicatorOrigin: {
        backgroundColor: "#212529"
    },
    indicatorNonOrigin: {
        backgroundColor: "#ffffff"
    },
    tabButtonNonOrigin: {
        maxWidth: "none",
        width: "100% !important"
    },
    tabLabelNonOrigin: {
        alignItems: "self-start",
    }
});

const Header = (props) => {
    const [tabNumber, setTabNumber] = useState(-1);
    const [originColor, setOriginColor] = useState(true);
    const [displayMobileLayout, setDisplayMobileLayout] = useState(false);

    const { classes, changeScrollBarColorByScroll } = props;



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
        let pages = document.querySelector('#pagesContainer').childNodes;

        if (!collapsed && mobileLayout) {
            document.querySelector('#toggleCollapseButton').click()
        }

        pages[tabNumber + 1].classList.add('notCurrentTab')
        pages[n + 1].classList.remove('notCurrentTab')
        setTabNumber(n)
        changeScrollBarColorByScroll();
    }

    useEffect(() => {
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
                console.log('upper')
                mobileLayout = true
                setDisplayMobileLayout(true);
                changeHeaderBackgroundWithoutUsingHambergar()
            } else if (window.innerWidth >= 992 && mobileLayout) {
                console.log('lower')
                if (window.scrollY <= 0) {
                    setOriginColor(true)
                }
                mobileLayout = false
                setDisplayMobileLayout(false);
            }
        })
    }, [])

    return (
        <div>
            <Navbar
                className={"headermain" + (originColor ? "" : " navbar-dark bg-dark")}
                id="navbar"
                fixed="top"
                collapseOnSelect
                expand="lg"
                style={{ padding: "10px" }}>
                <Nav
                    style={{ width: "100%" }}>
                    <Row
                        className="justify-content-lg-between  "
                        style={{ width: "100%", margin: "0" }}>
                        <Col
                            xs={12}
                            lg={2}
                            style={{ marginBottom: "10px" }}>
                            <div
                                className="d-flex justify-content-between">
                                <Navbar.Brand
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => changeTab(null, -1)}> Home</Navbar.Brand>
                                <Navbar.Toggle
                                    id="toggleCollapseButton"
                                    onClick={() => {
                                        if (window.scrollY <= 0 && !collapsed) {
                                            setOriginColor(true)
                                        } else {
                                            setOriginColor(false)
                                        }
                                        setDisplayMobileLayout(displayMobileLayout)
                                        collapsed = !collapsed
                                    }}
                                    aria-controls="responsive-navbar-nav" />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            lg={8}>
                            <Navbar.Collapse
                                id="responsive-navbar-nav">
                                <div
                                    className="d-flex flex-column flex-lg-row justify-content-center"
                                    style={{ width: "100%" }}>
                                    <Tabs
                                        {...displayMobileLayout && {orientation: "vertical"}}
                                        style={{ ...(displayMobileLayout && { width: "100%" }) }}
                                        classes={{
                                            indicator: (originColor ? classes.indicatorOrigin : classes.indicatorNonOrigin)
                                        }}
                                        value={tabNumber > -1 && tabNumber}
                                        onChange={changeTab}>
                                        {['About', 'No Quote', 'Number Typing'].map(string => {
                                            return (
                                                <Tab
                                                    style={{ ...(!originColor && { color: "#fff" }) }}
                                                    classes={{
                                                        root: (displayMobileLayout && classes.tabButtonNonOrigin),
                                                        wrapper: (displayMobileLayout && classes.tabLabelNonOrigin)
                                                    }}
                                                    label={string} />)
                                        })}
                                    </Tabs>
                                </div>
                            </Navbar.Collapse>
                        </Col>
                        <Col xs={0} lg={2}></Col>
                    </Row>

                </Nav>
            </Navbar>
            <Navbar className="invisible headermain" collapseOnSelect expand="lg" style={{ padding: "10px" }}>
                <Nav style={{ width: "100%" }}>
                    <Row className="justify-content-lg-between" style={{ width: "100%" }}>
                        <Col xs={12} lg={2} style={{ marginBottom: "10px" }}>
                            <div className="d-flex justify-content-between">
                                <Navbar.Brand> Home</Navbar.Brand>
                                <Navbar.Toggle />
                            </div>
                        </Col>
                    </Row>
                </Nav>
            </Navbar>

        </div >)
}

export default withStyles(styles)(Header);;