import React, { useState } from 'react';

const ChatInput = (props) => {

  const [ inputValue, updateValue ] = useState('');

  const handleSubmit = ( event ) => {
    event.preventDefault();
    props.addMessage( inputValue );
    updateValue('');
  };

  const handleChange = ( event ) => {
    updateValue( event.target.value );
  };

  return (
    <React.Fragment>
      <form onSubmit={ handleSubmit }>
        <input type='text' aria-label='chat-input' value={ inputValue } onChange={ handleChange }></input>
        <input type='submit' aria-label='chat-submit' value='Submit' />
      </form>
    </React.Fragment>
  );
};

export default ChatInput;