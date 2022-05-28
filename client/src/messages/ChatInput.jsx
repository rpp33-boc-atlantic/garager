import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ChatInput = ( props ) => {

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
    <Form id='chat-input-form' onSubmit={ handleSubmit }>

      <Form.Control
        id='chat-input-field'
        type='text'
        aria-label='chat-input'
        value={ inputValue }
        onChange={ handleChange }
      />

      <Button
        variant='primary'
        type='submit'
        aria-label='chat-submit'>
        Submit
      </Button>
    </Form>
  );
};

export default ChatInput;