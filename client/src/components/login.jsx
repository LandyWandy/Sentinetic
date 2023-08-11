import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import logo from "../images/sentinetic-logo-invert.svg";
import '../css/login.css';

function Login({ onLogin, isLoggedIn }) {
  // State management for form fields, loading, and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Apollo useMutation hook to call the LOGIN_USER mutation.
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  // Hook for navigation.
  const navigate = useNavigate();

  // Handle form submission for logging in.
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure both fields are filled in.
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      const token = data.loginUser.token;
      onLogin(token); // Pass the received token upwards

      // Clear the form fields.
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  // Check if the user is already logged in and redirect accordingly.
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  return (
    <section>
      <div className="login-form">
        <div className="container">
          <div className="login-container">
            <div className="header-wrapper container justify-content-center align-items-center">
              <img src={logo} alt="sentinetic-logo" className="mb-1"/>
              <h2 className="mx-2 m-2">Login</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="email@example.com"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter your password"/>
              </div>
              <button type="submit" className="btn btn-danger btn-block" disabled={loading}>
                {loading ? 'Loading...' : 'Log In'}
              </button>
            </form>
            <p> Need to register? <Link to="/register" className="btn btn-outline-danger">Click here </Link></p>
          </div>
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Login;
