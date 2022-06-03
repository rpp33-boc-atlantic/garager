import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaTools } from 'react-icons/fa';
import Logout from '../authentication/logout.jsx';

const NavLinks = () => {


  // this navbar uses a menue toggle for that reactively collapses for smaller screens.

  return (
    <Navbar expand="lg" bg='blue' variant='light' style={{ maxHeight: '70px' }}>
      <Container>
        <Navbar.Brand as={Link} to='home'>  <FaTools /> GARAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">FAQ</Nav.Link>
            <Nav.Link href="#home">RouterTest</Nav.Link>
            <Nav.Link as={Link} to='PostItem'>Post Item</Nav.Link>
            <Nav.Link as={Link} to='Messages'>Messages</Nav.Link>
            <Nav.Link as={Link} to='Item'>Checkout</Nav.Link>
            <Nav.Link as={Link} to='SearchBrowse'>Browse</Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='my-listings'>My Listings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='my-rentals'>My Rentals</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='PostItem'>Post Item</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='Stripe-Account-Setup'>Stripe Account Setup</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Saved</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Logout />
      </Container>
    </Navbar>
  );

};
export default NavLinks;