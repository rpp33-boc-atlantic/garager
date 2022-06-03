import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import {useUserAuth} from '../context/UserAuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //pass sign up function using useUserAuth hook
  const { logIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      //redirect user to homepage
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async (event) => {
    event.preventDefault();
    try {
      await facebookSignIn();
      //redirect user to homepage
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Log In</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit = {handleSubmit}>
                <Form.Group id='email'>
                  <Form.Label> Email</Form.Label>
                  <Form.Control type='email' placeholder = 'Email Address' onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label> Password</Form.Label>
                  <Form.Control type='password' placeholder = 'Password' onChange = {(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button className = 'w-100' type='submit'>Log In</Button>
              </Form>

              <div className='w-100 text-center mt-2'>
            or Log in with Facebook
              </div>
              <Button className = 'w-100' onClick = {handleFacebookSignIn}>Facebook Login</Button>
              <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to='/Signup'>Sign up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Login;