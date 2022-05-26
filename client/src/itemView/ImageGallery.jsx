import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
  grid-row: 1 / 3;
  // grid-auto-rows: minmax(100px, auto);
`;

const ImageGallery = (props) => {

  return (
    <Container>
      Images...
    </Container>
  );

};

export default ImageGallery;