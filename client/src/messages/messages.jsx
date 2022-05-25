import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './thread-list.jsx';
import Header from './header.jsx';
import ChatList from './chat-list.jsx';

const Messages = () => {

  const [ threads, updateThreads ] = useState(sampleThreads);
  const [ activeThread, selectThread ] = useState(0);

  return (
    <React.Fragment>
      <Header thread={ threads[activeThread] }/>
      <ThreadList threads={threads} selectThread={selectThread}/>
      <ChatList
        theirMessages={ threads[activeThread].theirMessages }
        myMessages={ threads[activeThread].myMessages }
      />
    </React.Fragment>
  );
};

export default Messages;