import React from 'react';

const DetailPane = ( props ) => {

  const thread = props.threads[ props.activeThread ];

  if (!thread) { return null; }

  if ( props.userData.userId === thread.ownerId ) {
    return (
      <React.Fragment>
        <p>{ thread.renterName }</p>
        <p>{ thread.renterImageUrl }</p>
        <p>{ thread.itemName }</p>
        <p>{ thread.itemImageUrl }</p>
      </React.Fragment>
    );

  } else {
    return (
      <React.Fragment>
        <p>{ thread.ownerName }</p>
        <p>{ thread.ownerImageUrl }</p>
        <p>{ thread.itemName }</p>
        <p>{ thread.itemImageUrl }</p>
      </React.Fragment>
    );
  }
};

export default DetailPane;