import React from 'react';
import moment from 'moment';

const ChatBubble = ( props ) => {

  return (
    <React.Fragment>

      <p className={ `from-${ props.user }` }>{ props.message.text }</p>

      <div className={ `chat-time-from-${ props.user }` }>
        { moment( props.message.timeCreated ).format('LT') }
      </div>

    </React.Fragment>
  );
};

export default ChatBubble;