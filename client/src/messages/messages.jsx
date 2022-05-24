import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';

const Messages = () => {

  const [activeThread, setActiveThread] = useState(0);
  const [threads, updateThreads] = useState(sampleThreads);

  return (
    <p>{threads[0].theirUsername}</p>
  );
};

export default Messages;