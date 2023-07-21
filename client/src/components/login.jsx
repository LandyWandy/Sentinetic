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
      <div className="form">
        <div>
          <div>
            <h1 className="headerOne">Sentinetic</h1>
          </div>
          <div>
            <div className="input-form-header">
              <h3>Login</h3>
            </div>
            <div className="input-form-content d-flex justify-content-center">
              <form onSubmit={handleFormSubmit}>
                <div id="input" className="input-group mb-3">
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    className="form-control" 
                    placeholder="Email" 
                    aria-label="Email" 
                    aria-describedby="basic-addon2" 
                    id="email" 
                    name="email"
                  />
                </div>
                <div id="input" className="input-group mb-3">
                  <input 
                    value={password}   
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    aria-label="Password" 
                    aria-describedby="basic-addon2"
                    id="password" 
                    name="password"
                  />
                </div>
                <div className="input-group-append d-flex justify-content-center">
                  <button 
                    className="btn btn-outline-danger"
                    type ="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Log In'}
                  </button>
                </div>    
                <div className="text-center">
                  <Link to="/register" className="btn btn-sm btn-block btn-danger">Register here if you do not have an account </Link>
                </div>
              </form>
            </div>
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
