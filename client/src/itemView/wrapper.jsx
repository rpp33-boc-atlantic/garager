import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, NavLink} from 'react-router-dom';
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
  background: white:
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(1fr, auto);
  justify-items: stretch;
  margin: 3em;
`;

const Item = (props) => {
  const fakeProps = sampleItemData.option1;
  const [itemData, setData] = useState({
    details: {
      'item_id': '',
      'user_id': '',
      title: '',
      brand: '',
      model: '',
      itemdescription: '',
      price: '',
      nyop: null,
      'min_price': null,
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
  const { user, userId } = useUserAuth();
  console.log('this should be the user id', userId);

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
        setData({ details: {}, datesBooked: [], notFound: true});
      });
    return () => mounted = false;
  }, [dataLoading]);

  const toggleAlert = () => {
    const successDelete = document.querySelector('.successDelete');
    successDelete.style.display = 'block';
  };

  const deleteItem = () => {
    const itemID = itemData.details.item_id;
    axios.delete('/item/itemData', {
      data: {
        ID: itemID
      }
    })
      .then(response => {
        toggleAlert();
      })
      .catch(error => {
        console.log('error in deleting item', error);
      });
  };

  const deleteButton = userId === itemData.details.user_id ? <button onClick={deleteItem} className="btn btn-primary btn-sm" style={{width: '7.5em'}}>Delete Post</button> : null;
  const ownerInfoData = itemData.details.item_id ? itemData.details : fakeProps;
  const itemDetailsData = itemData.details.item_id ? itemData.details : fakeProps;
  const rentFormData = itemData.details.item_id ? itemData : fakeProps;
  const imagesData = itemData.details.item_id ? itemData.details.photos : fakeProps.details.photos;

  if (itemData.notFound) {
    return (
      <div>
        <h2 className="text-center" style={{'paddingTop': '3.5em'}}> Oops, let's try this again.</h2>
        <h4 className="text-center">Just <Link to={'../SearchBrowse'}>click here </Link> to continue browsing.</h4>
        <p className="text-center">404 Not Found</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className='alert alert-success alert-dismissible fade show successDelete' role="alert" style={{display: 'none'}}>
          <strong>Post has been succesfully deleted.</strong>
        </div>
        <Container>
          <CarouselContainer className='gallery' images={imagesData}/>
          <OwnerInfo className='owner' details={ownerInfoData} user={user}/>
          <ItemDetails className='details' details={itemDetailsData}/>
          <RentForm className='form' itemInfo={rentFormData} userID={userId}/>
          {deleteButton}
        </Container>
      </div>
    );
  }
};

export default Item;















// import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import CarouselContainer from './CarouselContainer.jsx';
// import ItemDetails from './ItemDetails.jsx';
// import OwnerInfo from './OwnerInfo.jsx';
// import RentForm from './RentForm.jsx';
// import sampleItemData from './sampleItemData.js';
// import axios from 'axios';
// import { useUserAuth } from '../context/UserAuthContext.jsx';
// import { useMain } from '../context/MainContext.jsx';


// const Container = styled.div`
//   display: grid;
//   // background: #eee;
//   background: white:
//   padding: 1em;
//   grid-template-columns: 3fr 2fr;
//   grid-gap: 1em;
//   grid-auto-rows: minmax(1fr, auto);
//   justify-items: stretch;
//   // align-items: center;
//   // grid-template-rows: 1fr .5fr 2fr .5fr;
//   margin: 3em;
// `;

// const Item = (props) => {
//   const fakeProps = sampleItemData.option1;
//   const [itemData, setData] = useState({
//     details: {
//       'item_id': '',
//       'user_id': '',
//       title: '',
//       brand: '',
//       model: '',
//       itemdescription: '',
//       price: '',
//       nyop: null,
//       'min_price': null,
//       availablefrom: '',
//       availableto: '',
//       address: '',
//       photos: [],
//       firstname: '',
//       lastname: '',
//       email: '',
//       userphoto: null,
//       datejoined: ''
//     },
//     datesBooked: [{'json_build_array': []}]
//   });
//   const [dataLoading, setDataLoading] = useState(true);
//   let { id } = useParams();
//   const { user } = useUserAuth();
//   const { userId } = useMain();
//   console.log('this should be the user id', userId);

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
//           setData(response.data);
//           setDataLoading(false);
//         }
//       })
//       .catch(error => {
//         console.log('ERROR IN GETTING THE ITEM INFO', error);
//       });
//     return () => mounted = false;
//   }, [dataLoading]);

//   const toggleAlert = () => {
//     const successDelete = document.querySelector('.successDelete');
//     successDelete.style.display = 'block';
//   };

//   const deleteItem = () => {
//     const itemID = itemData.details.item_id;
//     axios.delete('/item/itemData', {
//       data: {
//         ID: itemID
//       }
//     })
//       .then(response => {
//         toggleAlert();
//       })
//       .catch(error => {
//         console.log('error in deleting item', error);
//       });
//   };

//   const deleteButton = user.email === itemData.details.email ? <button onClick={deleteItem} className="btn btn-primary btn-sm" style={{width: '7.5em'}}>Delete Post</button> : null;

//   const ownerInfoData = itemData.details.item_id ? itemData.details : fakeProps;
//   const itemDetailsData = itemData.details.item_id ? itemData.details : fakeProps;
//   const rentFormData = itemData.details.item_id ? itemData : fakeProps;
//   const imagesData = itemData.details.item_id ? itemData.details.photos : fakeProps.details.photos;
//   // console.log('dates booked in wrapper', itemData.datesBooked[0]['json_build_array']);

//   return (
//     <div>
//         <div className='alert alert-success alert-dismissible fade show successDelete' role="alert" style={{display: 'none'}}>
//           <strong>Post has been succesfully deleted.</strong>
//         </div>
//       <Container>
//         <CarouselContainer className='gallery' images={imagesData}/>
//         <OwnerInfo className='owner' details={ownerInfoData} />
//         <ItemDetails className='details' details={itemDetailsData}/>
//         <RentForm className='form' itemInfo={rentFormData}/>
//         {deleteButton}
//       </Container>
//     </div>
//   );
// };

// export default Item;