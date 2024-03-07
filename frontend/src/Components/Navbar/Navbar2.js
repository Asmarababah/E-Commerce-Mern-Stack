import React from 'react'
import './Navbar1.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const Navbar2 = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{height:"70px", position:'sticky',top:"0", right:"0"}}>
                <Container>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link > <Link to='/' style={{ textDecoration: "none" , color:"white" }}>Shop</Link></Nav.Link>
                        <Nav.Link><Link to='/women' style={{ textDecoration: "none" , color:"white" }}>Women</Link> </Nav.Link>
                        <Nav.Link> <Link to='/men' style={{ textDecoration: "none" , color:"white" }}>Men</Link> </Nav.Link>
                        <Nav.Link> <Link to='/kids' style={{ textDecoration: "none" , color:"white" }}>Kids</Link> </Nav.Link>
                        {/* <Nav.Link > <Link to='/accessories' style={{ textDecoration: "none" , color:"white" }}>Accessories</Link> </Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </>
    )
}

export default Navbar2
