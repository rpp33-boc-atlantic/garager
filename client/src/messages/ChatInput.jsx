import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
    <Form onSubmit={ handleSubmit } style={{ display: 'inline-flex', width: '550px' }}>
      <Form.Control type='text' aria-label='chat-input' value={ inputValue }
        onChange={ handleChange } style={{ borderRadius: '50px', marginRight: 15, marginLeft: 25 }} />
      <Button variant='primary' type='submit' aria-label='chat-submit'>
        Submit
      </Button>
    </Form>
  );
};

export default ChatInput;