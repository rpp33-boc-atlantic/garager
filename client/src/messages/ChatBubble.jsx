import React from 'react';
import moment from 'moment';

const ChatBubble = (props) => {

  // const onImageClick = () => {};

  return (
    <p>
      { props.message.username }: { props.message.text } <br />
      { moment(props.message.timeCreated).format('LT') }
    </p>
  );
};

export default ChatBubble;