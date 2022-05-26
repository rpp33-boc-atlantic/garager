import React from 'react';
import moment from 'moment';

const ThreadTile = (props) => {

  return (
    <React.Fragment>
      <p>
        {props.thread.username}<br />
        {props.thread.itemName}<br />
        {props.thread.lastMessage}<br />
        {moment.unix(props.thread.timeUpdated).fromNow()}
      </p>
    </React.Fragment>
  );
};

export default ThreadTile;