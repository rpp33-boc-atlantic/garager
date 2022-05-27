import React from 'react';
import moment from 'moment';

const ThreadTile = (props) => {

  return (
    <React.Fragment>
      { props.thread.username }<br />
      { props.thread.itemName }<br />
      { props.thread.lastMessage }<br />
      { moment(props.thread.timeUpdated).fromNow() }
    </React.Fragment>
  );
};

export default ThreadTile;