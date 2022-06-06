import React, { useState, useEffect, useRef } from 'react';
import sampleThreads from './liveChatSamples.js';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import { Row } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import './MessageStyles.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // JO ADDED THIS LINE

const Messages = ( props ) => {

  const [ threads, updateThreads ] = useState([]);
  const [ activeThread, changeThread ] = useState(0);
  const [ threadAdded, updateThreadAdded ] = useState(false);
  const [ userData, changeUserData ] = useState('');

  const { user } = useUserAuth();
  const threadRef = useRef([]);
  const location = useLocation();

  let itemID = null;
  if ( location.state ) {
    itemID = location.state.itemID;
  }

  useEffect(() => {
    if ( itemID && !threadAdded ) {
      updateThreadAdded(true);
      addThread();
    }
    if ( user.email ) {
      getUserInfo();
    }
    if ( threads.length === 0 && user.email ) {
      getThreads();
    }
    props.socketIO.on('message', ( message ) => {
      addMessage( message );
    });
  }, [ user ]);

  const getUserInfo = async () => {
    const result = await axios.get(`/messages/threads/user?email=${user.email}`);
    changeUserData( result.data );
  };

  const addThread = async () => {
    await axios.post('/messages/threads', {
      itemId: 32,
      renterId: 1,
      timeUpdated: Date.now()
    });
    getThreads();
  };

  const getThreads = async () => {
    const result = await axios.get(`/messages/threads?email=${user.email}`);
    threadRef.current = result.data;
    updateThreads ( result.data );
  };

  const addMessage = ( message ) => {
    let newThreads = [ ...threadRef.current ];

    for (let newThread of newThreads) {
      if ( message.threadId === newThread.threadId &&
           message.timeCreated > newThread.timeUpdated ) {

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
      'user_id': userData.userId,
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
            email={ user.email }
            userData={ userData }
          />
        </div>

        <div id='chat-column'>
          <ChatList
            threads={ threads }
            messages={ threads.length > 0 ? threads[ activeThread ].messages : [] }
            sendMessage={ sendMessage }
            userData={ userData }
          />
        </div>

      </Row>
    </section>
  );
};

export default Messages;