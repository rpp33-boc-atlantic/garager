import React from 'react';
import ThreadTile from './thread-tile.jsx';

const ThreadList = (props) => {

  const onThreadClick = () => {};

  return (
    <ThreadTile thread={ props.threads[0] }/>
  );
};

export default ThreadList;