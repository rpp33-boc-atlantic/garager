import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CarouselContainer from './CarouselContainer.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerInfo from './OwnerInfo.jsx';
import RentForm from './RentForm.jsx';
import sampleItemData from './sampleItemData.js';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext.jsx';

const Container = styled.div`
  display: grid;
  // background: #eee;
  background: white:
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(1fr, auto);
  justify-items: stretch;
  // align-items: center;
  // grid-template-rows: 1fr .5fr 2fr .5fr;
`;

const Item = (props) => {
  const fakeProps = sampleItemData.option1;
  const [itemData, setData] = useState({  itemID: null,
    name: '',
    brand: '',
    model: '',
    description: '',
    availableFrom: '',
    availableTo: '',
    availability: null,
    price: null,
    nameYourOwnPrice: null,
    minimumPrice: null,
    images: [],
    rangesBooked: [],
    owner: {
      id: null,
      name: '',
      email: '',
      dateJoined: '',
      address: ''
    }});
  let { id } = useParams();
  const { user } = useUserAuth();
  console.log('this should be the user email', user.email);
  console.log('this is the item id passed through params', id);

  useEffect(() => {
    let mounted = true;
    axios.get('/item/itemData', {
      params: {
        ID: 12345,
        name: 'ladder'
      }
    })
      .then(response => {
        if(mounted) {
          console.log('passing thru heres')
          setData(fakeProps);
        }
      })
      .catch(error => {
        console.log('ERROR IN GETTING THE ITEM INFO', error);
      });
      return () => mounted = false;
  });

  const deleteItem = () => {
    console.log('gonna delete item')
    axios.delete('/item/itemData', {
      data: {
        ID: 12345
      }
    })
    .then(response => {
      console.log('item has been deleted');
    })
    .catch(error => {
      console.log('error in deleting item', error);
    })
  };

  const deleteButton = user.email === itemData.owner.email ? <button onClick={deleteItem}>Delete Item</button> : null;

  return (
    <div>
      <Container>
        <CarouselContainer className='gallery' images={fakeProps.images}/>
        <OwnerInfo className='owner' name={fakeProps.name} owner={fakeProps.owner} />
        <ItemDetails className='details' details={fakeProps}/>
        <RentForm className='form' itemInfo={fakeProps} />
        {deleteButton}
      </Container>
    </div>
  );
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