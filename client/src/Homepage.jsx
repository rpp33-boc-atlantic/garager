import React from 'react';
import { Link } from 'react-router-dom';
import image from './img/hal-gatewood-v7WyjiyXNr4-unsplash.jpg';
import './authentication/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
const Homepage = () => {
  return (
    <div className = 'loginbg' style={{ backgroundImage: `url(${image})`}}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      ></Container>
    </div>
  );
};

export default Homepage;