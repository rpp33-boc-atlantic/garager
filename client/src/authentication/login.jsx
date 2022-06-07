import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import {useUserAuth} from '../context/UserAuthContext.jsx';
import {useMain} from '../context/MainContext.jsx';
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from 'firebase/auth';
import { auth } from '../firebase';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //pass sign up function using useUserAuth hook
  const { logIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();
  const {userId, registerUser} = useMain();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  /*const registerFB = (firebaseRes) => {
    let name = firebaseRes.user.displayName.split(' ');
    let firstName = name[0];
    let lastName = name[1];
    let email = firebaseRes.user.email;
    let bodyParam = {firstName, lastName, email};
    console.log('bodyParam', bodyParam);
    axios.post('/auth', bodyParam)
      .then((res) => {

        if (res.data !== '') {
          console.log('post res', res.data.user_id);
        }

        if (res.data === '') {
          axios.get('/auth', {
            params: {
              email: email
            }
          })
            .then((res) => {
              console.log('get res', res.data.user_id);
            })
            .catch((err) => {
              console.log('err getting user id', err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };*/

  const handleFacebookSignIn = async (event) => {
    event.preventDefault();
    try {
      await facebookSignIn()
        .then((res) => {
          //redirect user to homepage
          registerUser(res);
          console.log('userId', userId);
          navigate('/');
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
                <br></br>
                <Form.Group id='password'>
                  <Form.Label> Password</Form.Label>
                  <Form.Control type='password' placeholder = 'Password' onChange = {(e) => setPassword(e.target.value)} />
                </Form.Group>
                <br></br>
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