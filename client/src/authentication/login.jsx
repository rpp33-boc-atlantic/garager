import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import {useUserAuth} from '../context/UserAuthContext.jsx';
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from 'firebase/auth';
import { auth } from '../firebase';
import FacebookLogin from 'react-facebook-login';
import background from '../img/hal-gatewood-v7WyjiyXNr4-unsplash.jpg';
import './style.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //pass sign up function using useUserAuth hook
  const { logIn, facebookSignIn, registerUser} = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await logIn(email, password)
        .then((res) => {
          //temporarily putting register here, not all the users in firebase were registered in the database yet, need to delete line 28 later
          registerUser('', '', email);
          navigate('/SearchBrowse');
        });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async (event) => {
    event.preventDefault();
    try {
      await facebookSignIn()
        .then((res) => {
          //redirect user to homepage
          console.log('facebook sign in res', res);
          let email = res.user.email;
          if (res.user.displayName) {
            let name = res.user.displayName.split(' ');
            let firstName = name[0];
            let lastName = name[1];
            registerUser(firstName, lastName, email);
          } else {
            //for linking account user
            registerUser('', '', email);
          }
          navigate('/SearchBrowse');
        })
        .catch((err) => {
        //user tries to sign in with with an existing email account
          console.log(err.message);
          if (err.code === 'auth/account-exists-with-different-credential') {
            alert('Current email is registered with an existing account');
            const pendingCred = FacebookAuthProvider.credentialFromError(err);
            //console.log('pendingCred', FacebookAuthProvider.credentialFromError(err));
            //TODO: promp the user to enter email and password, async
            const email = prompt('Please enter your registered email to link accounts');
            const password = prompt('Please enter your password');
            linkAccount(email, password, pendingCred);
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const linkAccount = (email, password, pendingCred) => {
    logIn(email, password)
      .then((res) => {
        linkWithCredential(res.user, pendingCred)
          .then((res) => {
            registerUser('', '', email);
            alert('Succesfully linked accounts');
            navigate('/');
          })
          .catch((err) => {
            console.log('failed to link account', err.message);
            setError(err.message);
            navigate('/Login');
          });
      }).catch ((err) => {
        console.log('failed to sign in with email and password', err.message);
        setError(err.message);
        navigate('/Login');
      });
  };


  return (
    <div className = 'loginbg' style={{ backgroundImage: `url(${background})`}} >
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
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label> Email</Form.Label>
                  <Form.Control type='email' placeholder = 'Email Address' onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label> Password</Form.Label>
                  <Form.Control type='password' placeholder = 'Password' onChange = {(e) => setPassword(e.target.value)} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button className = 'w-100' type='submit'>Log In</Button>
                </div>
              </Form>
              <hr />
              <FacebookLogin cssClass='fb-login-button btn btn-primary' onClick = {handleFacebookSignIn} icon="fa-facebook-f"/>
              <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to='/Signup'>Sign up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;