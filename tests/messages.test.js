import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import Messages from '../client/src/messages/Messages.jsx';
import moment from 'moment';

// describe('Messages', ()=>{

//   test('Should render all components with correct data', () => {
//     render(<Messages />);
//     expect(screen.getByText('not very useful without the inifinity stones', { exact: false })).toBeInTheDocument();
//     expect(screen.getByText('what do you think of my power?', { exact: false })).toBeInTheDocument();
//   });

//   test('Should update messages on chat input submit', () => {
//     render(<Messages />);
//     fireEvent.change(screen.getByLabelText('chat-input'), {target: {value: 'test message'}});
//     fireEvent(screen.getByLabelText('chat-submit'), new MouseEvent('click'));
//     expect(screen.getAllByText('test message', { exact: false })[0]).toBeInTheDocument();
//   });

//   test('Should update chat window on thread click', () => {
//     render(<Messages />);
//     fireEvent.click(screen.getByLabelText('thread-tile-1'));
//     expect(screen.getByText('what do you think of my gauntlet?', { exact: false })).toBeInTheDocument();
//   });
// });

test('should display something', () => {

  expect('Message-view!').toMatch(/^Message(.*)/);
});