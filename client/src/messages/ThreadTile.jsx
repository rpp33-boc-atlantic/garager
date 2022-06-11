import React from 'react';
import moment from 'moment';

const ThreadTile = ( props ) => {

  const formatItem = ( username, itemName ) => {
    const combo = username + ' - ' + itemName;
    if ( combo.length < 30) { return itemName; }
    return ' - ' + itemName.slice( 0, 14 ) + '...';
  };

  const formatMessage = ( message ) => {
    if ( !message ) { return null; }
    if ( message.length < 40 ) { return message; }
    return message.slice( 0, 37 ) + '...';
  };

  const username =
    props.thread.ownerId === props.userId
      ? props.thread.renterName
      : props.thread.ownerName;

  return (
    <div className='thread-tile'>

      <span className='thread-name'>{ username }</span>

      <span className='thread-item'>
        { formatItem( username, props.thread.itemName ) }
      </span><br />

      <span className='thread-message'>
        { formatMessage( props.thread.lastMessage ) }
      </span><br />

      <span className='thread-time'>
        { moment( props.thread.timeUpdated ).fromNow() }
      </span>

    </div>
  );
};

export default ThreadTile;