import React, {useState} from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import {useUserAuth} from '../context/UserAuthContext.jsx';
import background from '../img/no-text-background.jpg';
import './style.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [error, setError] = useState('');
  //pass sign up function using useUserAuth custom hook
  const { signUp, logOut, registerUser} = useUserAuth();
  //redirect user back to login page after sign up
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signUp(email, password)
        .then((res) => {
          registerUser(firstname, lastname, email);
        });
      logOut();
      //redirect user back to login page after sign up
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className = 'loginbg' style={{ backgroundImage: `url(${background})`}}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit = {handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicFirstname'>
                  <Form.Label> First Name</Form.Label>
                  <Form.Control type='name' placeholder='First Name' onChange = {(e) => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicLastname'>
                  <Form.Label> Last Name</Form.Label>
                  <Form.Control type='name' placeholder='Last Name' onChange = {(e) => setLastName(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label> Email</Form.Label>
                  <Form.Control type='email' placeholder='Email Address' onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label> Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button className = 'w-100' type='submit'>Sign Up</Button>
                </div>
              </Form>
              <div className='w-100 text-center mt-2'>
              Already have an account? <Link to='/Login'>Log In</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Signup;