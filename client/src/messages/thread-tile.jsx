import React, { useState } from 'react';

const ThreadTile = (props) => {

  return (
    <p>{props.thread.theirUsername}</p>
  );
};

export default ThreadTile;