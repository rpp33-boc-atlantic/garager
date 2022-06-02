import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import { useUserAuth } from '../context/UserAuthContext.jsx';

const ChatList = ( props ) => {

  const { user } = useUserAuth();

  return (
    <React.Fragment>

      <div className='imessage'>
        {
          props.messages.map(( message, index ) => {

            if (message.username === user.email) {
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
        <ChatInput sendMessage={ props.sendMessage }/>
      </div>

    </React.Fragment>
  );
};

export default ChatList;