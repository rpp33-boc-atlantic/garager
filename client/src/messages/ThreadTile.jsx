import React from 'react';
import moment from 'moment';

const ThreadTile = ( props ) => {

  const formatName = ( name ) => {

    if ( name.length < 22 ) { return name; }

    return name.slice( 0, 20 ) + '...';
  };

  const formatMessage = ( message ) => {

    if ( message.length < 40 ) { return message; }

    return message.slice( 0, 38 ) + '...';
  };

  return (
    <div className='thread-tile'>

      <span className='thread-name'>
        {
          props.thread.ownerId === props.userData.userId
            ? props.thread.renterName
            : props.thread.ownerName
        }
      </span> - <span className='thread-time'>{ formatName( props.thread.itemName ) }</span><br />

      { formatMessage( props.thread.lastMessage ) }<br />

      <span className='thread-time'>
        { moment( props.thread.timeUpdated ).fromNow() }
      </span>

    </div>
  );
};

export default ThreadTile;