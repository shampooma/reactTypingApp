import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Header from './components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Header.css';

const Header = (props) => {
    const { setTab } = props;

    window.onscroll = () => {
        if (window.scrollY == 0) {
            document.querySelector('#navbar').classList.remove('navbar-dark', 'bg-dark')
        } else {
            document.querySelector('#navbar').classList.add('navbar-dark', 'bg-dark')
        }
    };

    return (<Navbar className="headermain" id="navbar" sticky="top" collapseOnSelect expand="lg" style={{ padding: "10px" }}>
        <Nav style={{ width: "100%" }}>
            <Row className="justify-content-lg-between  " style={{ width: "100%" }}>
                <Col xs={12} lg={2}>
                    <div className="d-flex justify-content-between">
                        <Navbar.Brand onClick={() => setTab(0)} > Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </div>
                </Col>
                <Col xs={12} lg={8}>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="d-flex flex-column flex-lg-row justify-content-center" style={{ width: "100%" }}>
                            <div>
                                <Nav.Link onClick={() => setTab(1)}>About</Nav.Link>
                            </div>
                            <div>
                                <Nav.Link onClick={() => setTab(2)}>No Quote</Nav.Link>
                            </div>
                            <div>
                                <Nav.Link onClick={() => setTab(3)}>Number Typing</Nav.Link>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Col>
                <Col xs={0} lg={2}></Col>
            </Row>

        </Nav>

    </Navbar>)
}

export default Header;