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
import moment from 'moment';

describe('Messages', ()=>{

  test('Should render all components with correct data', () => {
    render(<Messages />);
    expect(screen.getByText('wanda maximoff, chaos magic', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('days ago', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('wanda maximoff: what do you think of my power?', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`stephen strange: it's a bit much, tbh`, { exact: false })).toBeInTheDocument();
  });

  test('Should update messages on chat input submit', () => {
    render(<Messages />);
    fireEvent.change(screen.getByLabelText('chat-input'), {target: {value: 'test message'}});
    fireEvent(screen.getByLabelText('chat-submit'), new MouseEvent('click'));
    expect(screen.getByText('stephen strange: test message', { exact: false })).toBeInTheDocument();
  });

  test('Should update chat window on thread click', () => {
    render(<Messages />);
    fireEvent.click(screen.getByLabelText('thread-tile-1'));
    expect(screen.getByText('thanos: what do you think of my gauntlet?', { exact: false })).toBeInTheDocument();
  });
});