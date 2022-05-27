import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import { Stack } from 'react-bootstrap';
import moment from 'moment';

const ChatList = (props) => {

  return (
    <React.Fragment>
      <div className='imessage'>
        {
          props.messages.map(( message, index ) => {
            if (message.username === 'Stephen Strange') {
              return (
                <React.Fragment>
                  <p className='from-me' key={ index }>
                    <ChatBubble key={index} message={ message }/>
                  </p>
                  <div style={{ textAlign: 'right', fontSize: '18px'}}>
                    { moment(message.timeCreated).format('LT') }&nbsp;
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <p className='from-them' key={ index }>
                    <ChatBubble message={ message }/>
                  </p>
                  <div style={{ textAlign: 'left', fontSize: '18px'}}>
                  &nbsp;&nbsp;&nbsp;{ moment(message.timeCreated).format('LT') }
                  </div>
                </React.Fragment>
              );
            }
          })
        }
      </div>
      <div className='position-absolute bottom-0'>
        <ChatInput addMessage={ props.addMessage }/>
      </div>
    </React.Fragment>
  );
};

export default ChatList;