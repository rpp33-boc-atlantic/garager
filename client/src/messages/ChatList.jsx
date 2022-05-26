import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';

const ChatList = (props) => {

  return (
    <React.Fragment>
      <ChatBubble message={ props.theirMessages[0] }/>
      <ChatBubble message={ props.myMessages[0] }/>
      <ChatInput />
    </React.Fragment>
  );
};

export default ChatList;