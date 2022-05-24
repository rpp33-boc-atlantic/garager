import React, { useState } from 'react';

const ChatBubble = (props) => {

  const onImageClick = () => {};

  return (
    <p>Bubble: {props.message.body}</p>
  );
};

export default ChatBubble;