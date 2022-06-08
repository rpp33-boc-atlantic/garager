import React from 'react';
import moment from 'moment';

const ThreadTile = ( props ) => {

  return (
    <div className='thread-tile'>

      <span>
        <span className='thread-name'>
          {
            props.thread.ownerId === props.userData.userId ? props.thread.renterName : props.thread.ownerName
          }
        </span> - { props.thread.itemName }
      </span><br />

      { props.thread.lastMessage }<br />

      <span className='thread-time'>
        { moment( props.thread.timeUpdated ).fromNow() }
      </span>

    </div>
  );
};

export default ThreadTile;