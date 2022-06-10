import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import unavailableImage from './samplePhotos/unavailable-image.jpeg';

const Container = styled.div`
  display: grid;
  background: #eee;
  grid-row: 1 / 3;
`;

const CarouselContainer = (props) => {

  var carouselItem;
  if (props.images.length > 0) {
    carouselItem = props.images.map((image, i) =>
      <Carousel.Item key={i} style={{height: '30em'}}>
        <img
          className='d-block w-100'
          src={image}
          style={{height: '30em', width: '100%', objectFit: 'contain'}}
        />
      </Carousel.Item>
    );
  } else {
    carouselItem = <img src={unavailableImage} style={{height: '30em', width: '100%', objectFit: 'contain'}}></img>;
  }

  return (
    <Container>
      <Carousel interval={null} fade={true} variant="dark" style={{height: '30em'}}>
        {carouselItem}
      </Carousel>
    </Container>
  );

};

export default CarouselContainer;