import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

const Container = styled.div`
  display: grid;
  background: #eee;
  // padding-left: 1em;
  // padding-right: 1em;
  grid-row: 1 / 3;
  // grid-auto-rows: minmax(60px, auto);
  // grid-template-rows: .5em 1fr;
  // max-height: 100px
`;

const CarouselContainer = (props) => {

  const carouselItem = props.images.map((image, i) =>
    <Carousel.Item key={i} style={{height: '30em'}}>
      <img
        className='d-block w-100'
        // className='img-fluid'
        src={image}
        style={{height: '30em', width: '100%', objectFit: 'contain'}}
      />
    </Carousel.Item>
  );

  return (
    <Container>
      <Carousel interval={null} fade={true} variant="dark" >
        {carouselItem}
      </Carousel>
    </Container>
  );

};

export default CarouselContainer;


