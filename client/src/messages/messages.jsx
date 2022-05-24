import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './thread-list.jsx';
import Header from './header.jsx';

const Messages = () => {

  const [activeThread, selectThread] = useState(0);
  const [threads, updateThreads] = useState(sampleThreads);

  return (
    <React.Fragment>
      <Header thread={threads[activeThread]}/>
      <ThreadList threads={threads} selectThread={selectThread}/>
    </React.Fragment>
  );
};

export default Messages;