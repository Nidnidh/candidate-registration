import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import  {jwtDecode} from "jwt-decode";
import axios from 'axios';

const CenteredContainer = ({ children, bgColor = '#f2f2f2', minHeight = '100vh' }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container style={{ maxWidth: '400px', width: '100vw' }}>{children}</Container>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/candidates/login", { username, password });

      if (response.data.success) {
        console.log('Login successful');
       
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
     
    }
  };
  const handleLoginClick = (e) => {
    e.preventDefault(); 
    handleSubmit(e); 
  };
  

  return (
    <>
      <CenteredContainer>
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="text-center mb-4">Secure Login Page</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleLoginClick}>Login</Button>
          </Form>
          <section>
          <GoogleOAuthProvider clientId="574944714812-pv6t5lt19hupukk2g4krq0i9c3li9mbi.apps.googleusercontent.com">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        
        const decoded = jwtDecode(credentialResponse.credential);
        const userData = {
          email: decoded.email, 
          name: decoded.name, 
         
        };

        console.log(userData)
       const response = await axios.post("http://localhost:3001/candidates/google-login", userData);
console.log(response);
        if (response.data.success) {
          console.log('Google login successful');
          
        } else {
          console.log('Google login failed');
       }
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      }
    }}
    onError={() => {
      console.log('Google login failed');
    }}
  /> 
</GoogleOAuthProvider>

          </section>
        </div>
      </CenteredContainer>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>This content is outside the centered container.</p>
      </div>
    </>
  );
};

export default Login;
