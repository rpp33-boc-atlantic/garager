import React, { useState } from 'react';

const ChatInput = (props) => {

  const [ inputValue, updateValue ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMessage( inputValue );
  };

  const handleChange = (event) => {
    updateValue( event.target.value );
  };

  return (
    <React.Fragment>
      <form onSubmit={ handleSubmit }>
        <input type='text' value={ inputValue } onChange={ handleChange }></input>
        <input type='submit' value='Submit' />
      </form>
    </React.Fragment>
  );
};

export default ChatInput;