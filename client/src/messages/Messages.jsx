import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import { Row, } from 'react-bootstrap';
import './MessageStyles.css';

const Messages = ( props ) => {

  const [ threads, updateThreads ] = useState( sampleThreads );
  const [ activeThread, changeThread ] = useState(0);

  const addMessage = ( message ) => {

    props.socketIO.emit('message', { text: message });

    let newThreads = [ ...threads ];
    let newThread = newThreads[ activeThread ];
    let newMessage = {
      username: 'Stephen Strange',
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
    <section>
      <Row id='messages-row'>

        <div id='thread-column'>
          <ThreadList
            threads={ threads }
            activeThread={ activeThread }
            changeThread={ changeThread }
          />
        </div>

        <div id='chat-column'>
          <ChatList
            threads={ threads }
            messages={ threads[ activeThread ].messages }
            addMessage={ addMessage }
          />
        </div>

      </Row>
    </section>
  );
};

export default Messages;