import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Header from './components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Header.css';

let currentPage = 0;

const Header = (props) => {
    const {changeScrollBarColorByScroll} = props;
    function changeHeaderBackgroundWithoutUsingHambergar() {
        if (window.scrollY <= 0 && document.querySelector('#toggleCollapseButton').classList.contains('collapsed')) {
            document.querySelector('#navbar').classList.remove('navbar-dark', 'bg-dark')
        } else {
            document.querySelector('#navbar').classList.add('navbar-dark', 'bg-dark')
        }
    }

    function closeHeader(e) {
        let toggleCollapseButton = document.querySelector('#toggleCollapseButton');

        if (!e.target.classList.contains('headermain') && !document.querySelector('.headermain').contains(e.target) && !toggleCollapseButton.classList.contains('collapsed')) {
            toggleCollapseButton.click()
        }
    }

    function changeTab(n) {
        let toggleCollapseButton = document.querySelector('#toggleCollapseButton');
        let pages = document.querySelector('#pagesContainer').childNodes;
        if (!toggleCollapseButton.classList.contains('collapsed')) {
            toggleCollapseButton.click()

        }
        
        pages[currentPage].classList.add('notCurrentTab')
        pages[n].classList.remove('notCurrentTab')
        currentPage = n;
        changeScrollBarColorByScroll();
    }

    useEffect(() => {
        changeHeaderBackgroundWithoutUsingHambergar()

        document.addEventListener('mousedown', closeHeader)
        document.addEventListener('touchstart', closeHeader)

        window.addEventListener('scroll', () => {

            changeHeaderBackgroundWithoutUsingHambergar()
        });
    }, [])
    console.log('rerender')
    return (
        <div>
            <Navbar className="headermain" id="navbar" fixed="top" collapseOnSelect expand="lg" style={{ padding: "10px" }}>
                <Nav style={{ width: "100%" }}>
                    <Row className="justify-content-lg-between  " style={{ width: "100%", margin: "0" }}>
                        <Col xs={12} lg={2} style={{ marginBottom: "10px" }}>
                            <div className="d-flex justify-content-between">
                                <Navbar.Brand style={{ cursor: "pointer", ":hover": {backgroundColor: "blue"} }} onClick={() => changeTab(0)}> Home</Navbar.Brand>
                                <Navbar.Toggle id="toggleCollapseButton" onClick={() => {
                                    if (window.scrollY <= 0 && !document.querySelector('#toggleCollapseButton').classList.contains('collapsed')) {
                                        document.querySelector('#navbar').classList.remove('navbar-dark', 'bg-dark')
                                    } else {
                                        document.querySelector('#navbar').classList.add('navbar-dark', 'bg-dark')
                                    }
                                }} aria-controls="responsive-navbar-nav" />
                            </div>
                        </Col>
                        <Col xs={12} lg={8}>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <div className="d-flex flex-column flex-lg-row justify-content-center" style={{ width: "100%" }}>
                                    <div>
                                        <Nav.Link onClick={() => changeTab(1)}>About</Nav.Link>
                                    </div>
                                    <div>
                                        <Nav.Link onClick={() => changeTab(2)}>No Quote</Nav.Link>
                                    </div>
                                    <div>
                                        <Nav.Link onClick={() => changeTab(3)}>Number Typing</Nav.Link>
                                    </div>
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
        </div>)
}

export default Header;