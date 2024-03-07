import React, { useContext, useState, useEffect } from 'react';
import './Navbar1.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import bag from '../Assets/bag.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar1 = () => {
    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to='/' style={{ textDecoration: "none" }}>   <Navbar.Brand>Store Shop</Navbar.Brand> </Link>

                    <div className="d-flex">
                        {localStorage.getItem('auth-token')
                            ? <>
                                <p style={{paddingRight:"10px" , fontWeight:"bold" , marginTop:"10px"}}> Welcome  </p>
                                <Button Button id='btn-logout' onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/") }}>Logout </Button>
                            </>
                            : <Link to='/login' style={{ textDecoration: "none" }}> <Button variant="outline-success">Login</Button> </Link>}

                        <Link to='/cart' style={{ textDecoration: "none" }}>  <img src={bag} alt="" className='bag' /> </Link>
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                    </div>

                </Container>
            </Navbar>
        </div>
    )
}

export default Navbar1;
