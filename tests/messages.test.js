import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBubble from '../client/src/messages/ChatBubble.jsx';
import ChatInput from '../client/src/messages/ChatInput.jsx';
import ChatList from '../client/src/messages/ChatList.jsx';
import Header from '../client/src/messages/Header.jsx';
import Messages from '../client/src/messages/Messages.jsx';
import ThreadList from '../client/src/messages/ThreadList.jsx';
import ThreadTile from '../client/src/messages/ThreadTile.jsx';

describe('Messages', ()=>{

  test('Should render all components', () => {
    render(<Messages />);
    expect(screen.getByText('Header: wanda maximoff, chaos magic')).toBeInTheDocument();
    expect(screen.getByText('Thread tile: chaos magic')).toBeInTheDocument();
    expect(screen.getByText('wanda maximoff: what do you think of my power?')).toBeInTheDocument();
    expect(screen.getByText(`stephen strange: it's a bit much, tbh`)).toBeInTheDocument();
  });

  test('Should update messages on submit', () => {
    render(<Messages />);
    fireEvent.change(screen.getByLabelText('chat-input'), {target: {value: 'test message'}});
    fireEvent(screen.getByLabelText('chat-submit'), new MouseEvent('click'));
    expect(screen.getByText('stephen strange: test message')).toBeInTheDocument();
  });
});