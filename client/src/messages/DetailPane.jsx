import React from 'react';
import { Card } from 'react-bootstrap';

const DetailPane = ( props ) => {

  const thread = props.threads[ props.activeThread ];
  let username, userImage;

  if (!thread) { return null; }

  if (props.userData.userId === thread.ownerId) {
    username = thread.renterName;
    userImage = thread.renterImageUrl;
  } else {
    username = thread.ownerName;
    userImage = thread.ownerImageUrl;
  }

  return (

    <div id='detail-container'>

      <br />

      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={ userImage } />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title>{ username }</Card.Title>
        </Card.Body>
      </Card>

      <br />

      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={ thread.itemImageUrl } />
        <Card.Body>
          <Card.Text>
            <a style={{ textDecoration: 'none' }} href='/Messages'>
              { thread.itemName }
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailPane;