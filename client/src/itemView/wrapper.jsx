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
  // console.log('this should be the user id', userId);
  // console.log('this should be the user email', user.email);

  //new way to get userId (from local storage)
  const currentId = parseInt(localStorage.getItem('currentId'));
  // console.log('current userId from localstorage', currentId);

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
        // toggleAlert();
      })
      .catch(error => {
        alert('Error in deleting item.');
      });
  };

  const deleteButton = currentId === itemData.details.user_id ? <button onClick={deleteItem} className="btn btn-primary btn-sm" style={{width: '7.5em'}}><Link to={'../my-listings'} style={{color: 'white', textDecoration: 'none'}}>Delete Post</Link></button> : null;
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
          <RentForm className='form' itemInfo={rentFormData} userID={currentId} userEmail={user.email}/>
          {deleteButton}
        </Container>
      </div>
    );
  }
};

export default Item;



