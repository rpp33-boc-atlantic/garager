import React from 'react';
import ThreadTile from './ThreadTile.jsx';

const ThreadList = (props) => {

  const onThreadClick = () => {
    props.changeThread();
  };

  return (
    <ThreadTile thread={ props.threads[0] }/>
  );
};

export default ThreadList;