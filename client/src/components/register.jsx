import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../utils/mutations';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Add useNavigate hook

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log(data);
      setEmail('');
      setPassword('');
      navigate('/login'); // Navigate to login page
    },
    onError: (error) => {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Please try again.');
    },
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    registerUser({
      variables: { email, password },
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
      {error && (
        <div>
          <p className="error-text">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}

export default Register;
