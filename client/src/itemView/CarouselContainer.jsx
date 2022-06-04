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

  // img {
  //   max-width: 100%;
  //   max-height: 100%;
  //   display: block;
  //   justify-items:center
  // }

  // .carousel .item {
  //   height: 100px;
  // }

  // .item img {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   min-height: 100px;
  // }

  // NEW
  // display: flex;
  // height: 30em;
  // width: 50em;
`;

const CarouselContainer = (props) => {

  const carouselItem = props.images.map((image, i) =>
  <Carousel.Item key={i} >

    {/* </Carousel.Item><Carousel.Item key={i} style={{height: '30em'}}> */}
      <img
        className='d-block w-100 img-fluid'

        // className='img-fluid'
        // className='d-block w-50'
        src={image}
        style={{height: '30em', width: '50em'}}
        // style={{position: 'absolute'}}
      />
    </Carousel.Item>
  );

  return (
    <Container>
      {/* <Carousel interval={null} fade={true} variant="dark" style={{height: '100px'}}> */}

      <Carousel interval={null} fade={true} variant="dark" >
        {carouselItem}
      </Carousel>
    </Container>
  );

};

export default CarouselContainer;




// return (
//   <Container>
//     <Carousel interval={null} fade={true} variant="dark">
//       <Carousel.Item >
//         <img
//           className='d-block w-100'
//           src={ladder1}
//           alt='First slide'
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item >
//         <img
//           className='d-block w-100'
//           src={ladder2}
//           alt='Second slide'
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item >
//         <img
//           className='d-block w-100'
//           src={ladder3}
//           alt='Third slide'
//         />
//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   </Container>
// );