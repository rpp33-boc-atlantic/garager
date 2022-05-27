import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './ThreadList.jsx';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx';
import { Row, Col } from 'react-bootstrap';

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
    <section className="vh-100 d-flex flex-column">
      <Header thread={ threads[ activeThread ] }/>
      <Row className='h-100'>
        <Col>
          <ThreadList threads={ threads } changeThread={ changeThread }/>
        </Col>
        <Col>
          <ChatList
            threads={ threads }
            messages={ threads[ activeThread ].messages }
            addMessage={ addMessage }
          />
        </Col>
      </Row>
    </section>
  );
};

export default Messages;