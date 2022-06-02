import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CarouselContainer from './CarouselContainer.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerInfo from './OwnerInfo.jsx';
import RentForm from './RentForm.jsx';
import sampleItemData from './sampleItemData.js';
import axios from 'axios';

const Container = styled.div`
  display: grid;
  // background: #eee;
  background: white:
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(2em, auto);
  justify-items: stretch;
  // align-items: center;


  // grid-template-rows:40px 40px;
`;

const Item = (props) => {
  const fakeProps = sampleItemData.option1;
  const [itemData, setData] = useState({});
  let { id } = useParams();
  console.log('this is the item id passed through params', id);
  useEffect(() => {
    // console.log('this is the id in params', id)
    axios.get('/item/ItemInfo', {
      params: {
        ID: 12345,
        name: 'ladder'
      }
    }, [])
      .then(response => {
        console.log('GETTING THE ITEM INFO');
        return setData(fakeProps)
      })
      .then(response => {
        console.log('state right here', itemData);
      })
      .catch(error => {
        console.log('ERROR IN GETTING THE ITEM INFO', error);
      });
  })

  return (
    <div>
      <Container>
        <CarouselContainer className='gallery' images={fakeProps.images}/>
        <OwnerInfo className='owner' name={fakeProps.name} owner={fakeProps.owner} />
        <ItemDetails className='details' details={fakeProps}/>
        <RentForm className='form' itemInfo={fakeProps} />
      </Container>
    </div>
  )
};

export default Item;









// class Item extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     axios.get('/item/ItemInfo', {
//       params: {
//         ID: 12345,
//         name: 'ladder'
//       }
//     })
//       .then(response => {
//         // console.log('GETTING THE ITEM INFO');
//       })
//       .catch(error => {
//         console.log('ERROR IN GETTING THE ITEM INFO');
//       });
//   }

//   render () {
//     var fakeProps = sampleItemData.option1;
//     // console.log('this is fakeProps', fakeProps);
//     return (
//       <div>
//         <Container>
//           <CarouselContainer className='gallery' images={fakeProps.images}/>
//           <OwnerInfo className='owner' name={fakeProps.name} owner={fakeProps.owner} />
//           <ItemDetails className='details' details={fakeProps}/>
//           <RentForm className='form' itemInfo={fakeProps} />
//         </Container>
//       </div>
//     );
//   }
// }

// export default Item;