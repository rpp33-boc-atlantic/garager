import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaTools } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import Badge from 'react-bootstrap/Badge';
import Logout from '../authentication/logout.jsx';
import '../App.css';

const NavLinks = (props) => {
  // this navbar uses a menu toggle for that reactively collapses for smaller screens.
  const [expanded, setExpanded] = useState(false);
  const localId = localStorage.getItem('currentId') ? localStorage.getItem('currentId') : '';

  // sets up socketIO for new message notifications
  useEffect(() => {
    props.socketIO.on('message', (message) => { });
  });

  return (
    <Navbar sticky="top" expand="md" className='theme-blue' expanded={expanded} variant='light' style={{ maxHeight: '70px' }}>
      {/* <Container> */}
      <Navbar.Brand as={Link} to='home' >  <FaTools /> GARAGER</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : 'expanded')}/>
      {/* <Navbar.Collapse id="basic-navbar-nav"> */}
      <Navbar.Collapse id=" justify-content-end">
        <Nav className="me-auto" key={1}>
          <Nav.Link key={1} as={Link} to='SearchBrowse' onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>Browse</Nav.Link>
          <NavDropdown title="Account" id="basic-nav-dropdown" >
            <NavDropdown.Item as={Link} to='my-listings' onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>My Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='my-rentals' onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>My Rentals</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='PostItem' onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>Post Item</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`profile/${localId}`} onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='Stripe-Account-Setup'onClick={() => setTimeout(() => { setExpanded(false); }, 150)}>Stripe Account Setup</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to='Messages' onClick={() => setTimeout(() => { setExpanded(false); }, 150)} >
            <GoMail size='30px' /><Badge pill bg='danger'></Badge>
          </Nav.Link>

        </Nav>
        <Logout />
      </Navbar.Collapse>

      {/* </Container> */}
    </Navbar>
  );
};
export default NavLinks;
