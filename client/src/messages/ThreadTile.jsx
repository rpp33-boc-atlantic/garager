import React from 'react';
import moment from 'moment';

const ThreadTile = ( props ) => {

  return (
    <div className='thread-tile'>

      <span>
        <span className='thread-name'>
          {
            props.thread.email === props.email ? props.thread.username : props.username
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