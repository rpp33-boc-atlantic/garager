import React from 'react';

const ChatBubble = (props) => {

  const onImageClick = () => {};

  return (
    <p>{ props.message.username }: { props.message.text }</p>
  );
};

export default ChatBubble;