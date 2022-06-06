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
  const [itemData, setData] = useState({
    details: {
      item_id: '',
      title: '',
      brand: '',
      model: '',
      itemdescription: '',
      price: '',
      nyop: null,
      min_price: null,
      availablefrom: '',
      availableto: '',
      address: '',
      photos: [],
      firstname: '',
      lastname: '',
      email: '',
      userphoto: null,
      datejoined: ''
    },
    datesBooked: [{'json_build_array': []}]
  });
  const [dataLoading, setDataLoading] = useState(true);
  let { id } = useParams();
  const { user } = useUserAuth();
  console.log('this should be the user email', user.email);
  // console.log('this is the item id passed through params', id);

  useEffect(() => {
    let mounted = true;
    axios.get('/item/itemData', {
      params: {
        ID: id
      }
    })
      .then(response => {
        if (mounted) {
          console.log('response after fetching item data', response.data);
          setData(response.data);
          setDataLoading(false);
        }
      })
      .catch(error => {
        console.log('ERROR IN GETTING THE ITEM INFO', error);
      });
    return () => mounted = false;
  }, [dataLoading]);

  const deleteItem = () => {
    console.log('gonna delete item');
    const itemID = 1234567;
    axios.delete('/item/itemData', {
      data: {
        ID: itemID
      }
    })
      .then(response => {
        console.log('item has been deleted');
      })
      .catch(error => {
        console.log('error in deleting item', error);
      });
  };

  const deleteButton = user.email === itemData.details.email ? null : <button onClick={deleteItem}>Delete Item</button>;

  const ownerInfoData = itemData.details.item_id ? itemData.details : fakeProps;
  const itemDetailsData = itemData.details.item_id ? itemData.details : fakeProps;
  const rentFormData = itemData.details.item_id ? itemData : fakeProps;
  // console.log('dates booked in wrapper', itemData.datesBooked[0]['json_build_array']);

  return (
    <div>
      <Container>
        <CarouselContainer className='gallery' images={fakeProps.details.images}/>
        <OwnerInfo className='owner' details={ownerInfoData} />
        <ItemDetails className='details' details={itemDetailsData}/>
        <RentForm className='form' itemInfo={rentFormData}/>
        {deleteButton}
      </Container>
    </div>
  );
};

export default Item;




// axios.delete('/item/itemData', {
//   data: {
//     ID: 12345
//   }
// })






// { itemID: null,
//   name: '',
//   brand: '',
//   model: '',
//   description: '',
//   availableFrom: '',
//   availableTo: '',
//   availability: null,
//   price: null,
//   nameYourOwnPrice: null,
//   minimumPrice: null,
//   images: [],
//   rangesBooked: [],
//   owner: {
//     id: null,
//     name: '',
//     email: '',
//     dateJoined: '',
//     address: ''
//   }}




// {
//   details: {
//     item_id: '',
//     title: '',
//     brand: '',
//     model: '',
//     itemdescription: '',
//     price: '',
//     nyop: null,
//     min_price: null,
//     availablefrom: '',
//     availableto: '',
//     address: '',
//     photos: [],
//     firstname: '',
//     lastname: '',
//     owner: { email: ''},
//     userphoto: null,
//     datejoined: ''
//   },
//   transactions: []
// }







// const Item = (props) => {
//   const fakeProps = sampleItemData.option1;
//   const [itemData, setData] = useState({ itemID: null,
//     name: '',
//     brand: '',
//     model: '',
//     description: '',
//     availableFrom: '',
//     availableTo: '',
//     availability: null,
//     price: null,
//     nameYourOwnPrice: null,
//     minimumPrice: null,
//     images: [],
//     rangesBooked: [],
//     owner: {
//       id: null,
//       name: '',
//       email: '',
//       dateJoined: '',
//       address: ''
//     }});
//   let { id } = useParams();
//   const { user } = useUserAuth();
//   console.log('this should be the user email', user.email);
//   // console.log('this is the item id passed through params', id);

//   useEffect(() => {
//     let mounted = true;
//     axios.get('/item/itemData', {
//       params: {
//         ID: id
//       }
//     })
//       .then(response => {
//         if (mounted) {
//           console.log('response after fetching item data', response.data);
//           setData(fakeProps);
//         }
//       })
//       .catch(error => {
//         console.log('ERROR IN GETTING THE ITEM INFO', error);
//       });
//     return () => mounted = false;
//   });

//   const deleteItem = () => {
//     console.log('gonna delete item');
//     const itemID = 1234567;
//     axios.delete('/item/itemData', {
//       data: {
//         ID: itemID
//       }
//     })
//       .then(response => {
//         console.log('item has been deleted');
//       })
//       .catch(error => {
//         console.log('error in deleting item', error);
//       });
//   };

//   const deleteButton = user.email === itemData.owner.email ? null : <button onClick={deleteItem}>Delete Item</button>;

//   return (
//     <div>
//       <Container>
//         <CarouselContainer className='gallery' images={fakeProps.images}/>
//         {/* <OwnerInfo className='owner' details={itemData.details} /> */}
//         <ItemDetails className='details' details={fakeProps}/>
//         <RentForm className='form' itemInfo={fakeProps} />
//         {deleteButton}
//       </Container>
//     </div>
//   );
// };

// export default Item;