import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../css/login.css';

function Login({ onLogin, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      const token = data.loginUser.token;
      onLogin(token);

      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

    return (
        <section>
        <div class="login-form">
            <div class="container">
                <div class="login-container">
                    <h2>Login</h2>
                    <form>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email"placeholder="email@example.com"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="Enter your password"/>
                        </div>
                        <button type="submit" class="btn btn-danger btn-block" onClick={handleSubmit}>Login</button>
                    
                    </form>
                    <p> Need to register? <button class="btn btn-outline-danger">Click here</button></p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login;
