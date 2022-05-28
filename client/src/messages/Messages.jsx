import React, { useState } from 'react';
import sampleThreads from './sampleThreads.js';
import ThreadList from './ThreadList.jsx';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx';
import { Row, Col } from 'react-bootstrap';
import './MessageStyles.css';

const Messages = () => {

  const [ threads, updateThreads ] = useState( sampleThreads );
  const [ activeThread, changeThread ] = useState(0);

  const addMessage = ( message ) => {
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
      {/* <Header thread={ threads[ activeThread ] }/> */}
      <Row id='test'>
        <div style={{ maxWidth: 450, marginRight: '15px' }}>
          <ThreadList threads={ threads } activeThread={ activeThread } changeThread={ changeThread }/>
        </div>
        <div style={{ maxWidth: 600, marginBottom: 0, marginLeft: '-30px', borderLeft: '1px solid rgb(218, 218, 218)', borderRight: '1px solid rgb(218, 218, 218)'}}>
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