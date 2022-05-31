import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaTools } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import { GoMail } from 'react-icons/go';

const NavLinks = ( props ) => {
  // this navbar uses a menu toggle for that reactively collapses for smaller screens.

  // sets up socketIO for new message notifications
  useEffect(() => {
    props.socketIO.on('message', ( message ) => {});
  });

  return (
    <Navbar expand="lg" bg='blue' variant='light' style={{ maxHeight: '70px' }}>
      <Container>
        <Navbar.Brand as={Link} to='home'>  <FaTools /> GARAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">FAQ</Nav.Link>
            <Nav.Link href="#home">RouterTest</Nav.Link>
            <Nav.Link as={Link} to='Signup'>Sign Up</Nav.Link>
            <Nav.Link as={Link} to='Login'>Log In</Nav.Link>
            <Nav.Link as={Link} to='PostItem'>Post Item</Nav.Link>
            <Nav.Link as={Link} to='Item'>Checkout</Nav.Link>
            <Nav.Link as={Link} to='SearchBrowse'>Browse</Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='my-listings'>My Listings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='my-rentals'>My Rentals</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Saved</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>

            <Nav.Link as={Link} to='Messages'>
              <GoMail size='30px' /><Badge pill bg='danger'></Badge>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );





};
export default NavLinks;