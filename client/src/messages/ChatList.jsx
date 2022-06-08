import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = ( props ) => {

  return (

    <React.Fragment>

      <div className='imessage'>
        {
          props.messages.map(( message, index ) => {
<<<<<<< HEAD
            if (message.username === user.email) {
=======

            if ( message.user_id === props.userData.userId ) {
>>>>>>> main
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
        {
          props.threads.length > 0
            ? <ChatInput sendMessage={ props.sendMessage }/>
            : <></>
        }
      </div>

    </React.Fragment>
  );
};

export default ChatList;