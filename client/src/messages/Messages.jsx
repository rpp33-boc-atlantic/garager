import React, { useState, useEffect } from 'react';
import sampleThreads from './liveChatSamples.js';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import { Row } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import './MessageStyles.css';
import { useLocation } from 'react-router-dom'; // JO ADDED THIS LINE

const Messages = ( props ) => {

  const { user } = useUserAuth();
  const [ threads, updateThreads ] = useState( sampleThreads );
  const [ activeThread, changeThread ] = useState(0);

  // ***** JO ADDED THE NEXT THREE LINES TO PASS ITEM ID TO MESSAGES *****
  const location = useLocation();
  let itemID;
  if (location.state) {
    itemID = location.state.itemID;
  }
  // const { itemID } = location.state; <-- DID NOT WORK IN CASES WHERE MESSAGES IS ACCESSED FROM A DIFFERENT COMPONENT OTHER THAN CheckoutSuccess.jsx
  // console.log('itemID in message', itemID);

  useEffect(() => {
    props.socketIO.on('message', ( message ) => {
      addMessage( message );
    });
  });

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