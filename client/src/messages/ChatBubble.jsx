import React from 'react';
import moment from 'moment';

const ChatBubble = (props) => {

  // const onImageClick = () => {};

  return (
    <React.Fragment>
      { props.message.text }
    </React.Fragment>
  );
};

export default ChatBubble;