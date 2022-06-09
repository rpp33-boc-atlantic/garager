import React from 'react';
import { Link } from 'react-router-dom';
import image from './img/hal-gatewood-v7WyjiyXNr4-unsplash.jpg';

const Homepage = () => {
  return (
    <div>
      <img style={{ width: '100%', height: 'auto'}} alt='tools image' src={image}></img>
    </div>
  );
};

export default Homepage;