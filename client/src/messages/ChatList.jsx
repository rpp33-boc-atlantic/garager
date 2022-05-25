import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = (props) => {

  return (
    <React.Fragment>
      {props.messages.map(message => {
        return <ChatBubble message={ message }/>;
      })}
      <ChatInput />
    </React.Fragment>
  );
};

export default ChatList;