import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './ThreadList.jsx';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx';

const Messages = () => {

  const [ threads, updateThreads ] = useState( sampleThreads );
  const [ activeThread, changeThread ] = useState(0);

  const addMessage = ( message ) => {
    let newThreads = [ ...threads ];
    let newThread = newThreads[ activeThread ];
    let newMessage = {
      username: 'stephen strange',
      text: message,
      imageUrl: null,
      timeCreated: Date.now()
    };
    newThread.messages.push( newMessage );
    newThread.timeUpdated = Date.now();
    newThread.lastMessage = message;
    updateThreads( newThreads );
  };

  return (
    <React.Fragment>
      <Header thread={ threads[ activeThread ] }/>
      <ThreadList threads={ threads } changeThread={ changeThread }/>
      <ChatList
        threads={ threads }
        messages={ threads[ activeThread ].messages }
        addMessage={ addMessage }
      />
    </React.Fragment>
  );
};

export default Messages;