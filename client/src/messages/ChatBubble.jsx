import React from 'react';
import moment from 'moment';

const ChatBubble = (props) => {

  // const onImageClick = () => {};

  return (
    <React.Fragment>
      { props.message.username }: { props.message.text } <br />
      { moment(props.message.timeCreated).format('LT') }
    </React.Fragment>
  );
};

export default ChatBubble;