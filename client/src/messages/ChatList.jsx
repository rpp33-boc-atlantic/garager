import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = (props) => {

  return (
    <React.Fragment>
      {
        props.messages.map(( message, index ) => {
          return <ChatBubble key={ index } message={ message }/>;
        })
      }
      <ChatInput addMessage={ props.addMessage }/>
    </React.Fragment>
  );
};

export default ChatList;