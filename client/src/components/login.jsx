import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

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
      if(isLoggedIn) {
        navigate('/main');
      }
    }, [isLoggedIn, navigate]);
  
    return (
      <section>
        <div className="form">
          <div className="input-form-header">
            <h3>Login</h3>
          </div>
  
          <div className="input-form-content d-flex justify-content-center">
            <form onSubmit={handleFormSubmit}>
                <div className="input-group mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="youremail@gmail.com"
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
                  placeholder="******"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  id="password"
                  name="password"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Log In'}
                  </button>
                </div>
                <div>
                  <Link to="/register" className="btn btn-outline-secondary">
                    Register here if you do not have an account
                  </Link>
                </div>
              </div>
            </form>
            {errorMessage && (
              <div>
                <p className="error-text">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
  
  export default Login;