import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles/Homepage.css';
import { FaTools } from 'react-icons/fa';
import image from './img/hal-gatewood-v7WyjiyXNr4-unsplash.jpg';

const Homepage = () => {
  return (
    <div>
      <header>
        <Navbar bg='blue' variant='light'>
          <Container>
            <Navbar.Brand>
              <FaTools />
              {' '}GARAGER
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <img id='homepageImg' alt='tools image' src={image}></img>
    </div>
  );
};

export default Homepage;