import React, { useState, useEffect } from 'react';
import sampleThreads from './liveChatSamples.js';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import { Row } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import './MessageStyles.css';
import axios from 'axios';

const Messages = ( props ) => {

  const { user } = useUserAuth();
  const [ threads, updateThreads ] = useState( sampleThreads );
  const [ activeThread, changeThread ] = useState(0);

  useEffect(() => {
    // getThreads();

    props.socketIO.on('message', ( message ) => {
      addMessage( message );
    });
  });

  const addThread = async () => {
    await axios.post('/messages/threads', {
      threadId: 1,
      itemName: 'Chaos Magic',
      itemImageUrl: null,
      username: 'dude@dude.com',
      userImageUrl: null,
      userRole: 'owner',
      lastMessage: 'nice',
      timeUpdated: 1653508198000,
      viewed: false,
    });
  };

  const getThreads = async () => {
    const newThreads = await axios.get('/threads');
    updateThreads ( newThreads );
  };

  const addMessage = ( message ) => {
    let newThreads = [ ...threads ];

    for (let newThread of newThreads) {
      if (message.threadId === newThread.threadId &&
            message.timeCreated > newThread.timeUpdated) {

        newThread.messages.push( message );
        newThread.timeUpdated = message.timeCreated;
        newThread.lastMessage = message.text;
      }
    }
    updateThreads( newThreads );
  };

  const sendMessage = ( message ) => {
    let newMessage = {
      threadId: threads[ activeThread ].threadId,
      username: user.email,
      text: message,
      imageUrl: null,
      timeCreated: Date.now()
    };
    props.socketIO.emit( 'message', newMessage );
  };

  return (
    <section>

      <Row id='messages-row'>

        <input type='button' value='create thread' onClick={addThread}/>

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
            sendMessage={ sendMessage }
          />
        </div>

      </Row>
    </section>
  );
};

export default Messages;