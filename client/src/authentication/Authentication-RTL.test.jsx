import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthenticationSample from './authenticationSample.jsx';

describe('Sample Test', ()=>{

  test('should render heading ', ()=>{
    render(<AuthenticationSample />);
    expect(screen.getByText('Authentication')).toBeInTheDocument();
  });

});