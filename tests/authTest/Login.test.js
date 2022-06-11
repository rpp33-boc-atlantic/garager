import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../client/src/authentication/authenticationSample.jsx';

describe('Login Form', ()=>{
  beforeEach(() => {
    const {container} = render(<Login />).container;
  });
  test('renders "Log in " title ', ()=>{
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

});