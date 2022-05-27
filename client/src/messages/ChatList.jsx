import React from 'react';
import ChatBubble from './ChatBubble.jsx';
import ChatInput from './ChatInput.jsx';
import { Stack } from 'react-bootstrap';

const ChatList = (props) => {

  return (
    <React.Fragment>
      <Stack gap={3}>
        {
          props.messages.map(( message, index ) => {
            return (
              <div>
                <ChatBubble key={ index } message={ message }/>
              </div>
            );
          })
        }
      </Stack>
      <div className='position-absolute bottom-0 end-0'>
        <ChatInput addMessage={ props.addMessage }/>
      </div>
    </React.Fragment>
  );
};

export default ChatList;