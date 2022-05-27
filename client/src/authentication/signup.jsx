import React, {useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useUserAuth} from '../context/UserAuthContext.jsx';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //pass sign up function using useUserAuth hook
  const { signUp } = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit = {handleSubmit}>
            <Form.Group id='email'>
              <Form.Label> Email</Form.Label>
              <Form.Control type='email' placeholder='Email Address' onChange = {(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label> Password</Form.Label>
              <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button className = 'w-100' type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/Login'>Log In</Link>
      </div>
    </>
  );
};

export default Signup;