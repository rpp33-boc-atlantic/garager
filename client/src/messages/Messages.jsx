import React, { useState, useEffect, useRef } from 'react';
import sampleThreads from './liveChatSamples.js';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import { Row } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import './MessageStyles.css';
import axios from 'axios';

const Messages = ( props ) => {

  const { user } = useUserAuth();
  const [ threads, updateThreads ] = useState([]);
  const [ activeThread, changeThread ] = useState(0);
  const threadRef = useRef([]);

  useEffect(() => {
    if (threads.length === 0) {
      getThreads();
    }
    props.socketIO.on('message', ( message ) => {
      addMessage( message );
    });
  }, []);

  const addThread = async () => {
    await axios.post('/messages/threads', {
      itemId: 4,
      ownerId: 7,
      renterId: 8,
      timeUpdated: Date.now()
    });
    getThreads();
  };

  const getThreads = async () => {
    const result = await axios.get('/messages/threads');
    threadRef.current = result.data;
    updateThreads ( result.data );
  };

  const addMessage = ( message ) => {
    let newThreads = [ ...threadRef.current ];

    for (let newThread of newThreads) {
      if (message.threadId === newThread.threadId &&
            message.timeCreated > newThread.timeUpdated) {

        newThread.messages.push( message );
        newThread.timeUpdated = message.timeCreated;
        newThread.lastMessage = message.text;
      }
    }
    threadRef.current = newThreads;
    updateThreads( newThreads );
  };

  const sendMessage = ( message ) => {
    let newMessage = {
      threadId: threads[ activeThread ].threadId,
      email: user.email,
      text: message,
      imageUrl: null,
      timeCreated: Date.now()
    };
    props.socketIO.emit( 'message', newMessage );
  };

  return (
    <section>

      <Row id='messages-row'>

        {/* <input type='button' value='create thread' onClick={addThread}/> */}

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
            messages={ threads.length > 0 ? threads[ activeThread ].messages : [] }
            sendMessage={ sendMessage }
          />
        </div>

      </Row>
    </section>
  );
};

export default Messages;