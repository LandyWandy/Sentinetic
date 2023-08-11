import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../utils/mutations';
import logo from "../images/sentinetic-logo-invert.svg";
import '../css/register.css';

function Register({ onLogin }) {
  // State management for form fields and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Hook for navigation.
  const navigate = useNavigate();

  // Apollo useMutation hook to call the REGISTER_USER mutation.
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log(data);
      setEmail('');
      setPassword('');
      navigate('/login'); // On successful registration, redirect to login page.
    },
    onError: (error) => {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Please try again.');
    },
  });

  // Handle input changes for the email and password fields.
  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  // Handle form submission.
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation to ensure both fields are filled in.
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Attempt to register the user with the provided email and password.
    registerUser({
      variables: { email, password },
    })
    .then(() => {
      navigate('/login'); // On successful registration, redirect to login page.
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Please try again.');
    });
  };

  return (
    <section>
      <div className="container">
        <div className="register-container">
          <div className="header-wrapper1 container justify-content-center align-items-center">
            <img src={logo} alt="sentinetic-logo" className="mb-2" />
            <h2 className="mx-2 m-2">Register</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input value={email} onChange={handleInputChange} type="email" name="email" className="form-control" id="username" placeholder="Enter a valid email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input value={password} onChange={handleInputChange} type="password" name="password" className="form-control" id="password" placeholder="Enter a strong password" />
            </div>
            <button type="submit" className="btn btn-danger btn-block">{loading ? 'Loading...' : 'Submit'}</button>
          </form>
          <p> Already registered? <Link to="/" className="btn btn-outline-danger">Login here </Link></p>
        </div>
      </div>
    </section>
  );
}

export default Register;
