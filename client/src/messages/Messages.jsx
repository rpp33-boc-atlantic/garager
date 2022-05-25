import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './ThreadList.jsx';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx';

const Messages = () => {

  const [ threads, updateThreads ] = useState(sampleThreads);
  const [ activeThread, changeThread ] = useState(0);

  return (
    <React.Fragment>
      <Header thread={ threads[activeThread] }/>
      <ThreadList threads={threads} changeThread={changeThread}/>
      <ChatList
        messages={ threads[activeThread].messages }
      />
    </React.Fragment>
  );
};

export default Messages;