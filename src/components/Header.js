import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Header from './components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = (props) => {
    const { setTab } = props;

    return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {/* <Nav className="mr-auto"> */}
        <Row style={{ width: "100%" }}>
            <Col xs={2}><Navbar.Brand onClick={() => setTab(0)} > Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /></Col>
            <Col xs={8}><Navbar.Collapse id="responsive-navbar-nav">
            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                <div>

                    <Nav.Link onClick={() => setTab(1)}>About</Nav.Link>
                </div>
                <div>
                    <Nav.Link onClick={() => setTab(2)}>Contact</Nav.Link>

                </div>
                </div>

            </Navbar.Collapse>
            </Col>
            <Col xs={2}><h1>hi</h1></Col>
        </Row>


        {/* </Nav> */}
    </Navbar>)
}

export default Header;