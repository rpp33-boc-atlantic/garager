import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = ( props ) => {

  return (
    <React.Fragment>

      <div className='imessage'>
        {
          props.messages.map(( message, index ) => {

            if (message.username === 'Stephen Strange') {
              return (
                <ChatBubble key={ index } message={ message } user='me' />
              );

            } else {
              return (
                <ChatBubble key={ index } message={ message } user='them' />
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