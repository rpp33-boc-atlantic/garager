import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Messages from './messages.jsx';

describe('Sample Test', ()=>{

  test('should render heading ', ()=>{
    render(<Messages />);
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

});