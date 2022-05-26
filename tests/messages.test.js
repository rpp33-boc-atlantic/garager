import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBubble from '../client/src/messages/ChatBubble.jsx';
import ChatInput from '../client/src/messages/ChatInput.jsx';
import ChatList from '../client/src/messages/ChatList.jsx';
import Header from '../client/src/messages/Header.jsx';
import Messages from '../client/src/messages/Messages.jsx';
import ThreadList from '../client/src/messages/ThreadList.jsx';
import ThreadTile from '../client/src/messages/ThreadTile.jsx';


describe('Thread', ()=>{

  test('should render components ', () => {
    render(<Messages />);
    expect(screen.getByText('Header: wanda maximoff, chaos magic')).toBeInTheDocument();
    expect(screen.getByText('Thread tile: chaos magic')).toBeInTheDocument();
    expect(screen.getByText('wanda maximoff: what do you think of my power?')).toBeInTheDocument();
    expect(screen.getByText(`stephen strange: it's a bit much, tbh`)).toBeInTheDocument();
  });

});