import React from 'react';
import moment from 'moment';

const ThreadTile = (props) => {

  return (
    <React.Fragment>
      <span style={{ fontSize: '18px' }}><strong>{ props.thread.username }</strong> - { props.thread.itemName }</span><br />
      { props.thread.lastMessage }<br />
      <span style={{ fontSize: '16px', color: 'gray' }}>{ moment(props.thread.timeUpdated).fromNow() }</span>
    </React.Fragment>
  );
};

export default ThreadTile;