import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = ( props ) => {

  return (
    <div id='chat-list'>

      <div className='imessage'>
        {
          props.messages.map(( message, index ) => {

            if ( message.user_id === props.userId ) {
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

      <div id='chat-input' /*className='position-absolute bottom-0'*/>
        {
          props.threads.length > 0
            ? <ChatInput sendMessage={ props.sendMessage }/>
            : <></>
        }
      </div>

    </div>
  );
};

export default ChatList;