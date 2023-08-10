import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/main';
import Register from './components/register';
import Login from './components/login';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up an HTTP link for the Apollo Client, pointing to your GraphQL server
const httpLink = createHttpLink({
  uri: 'https://sentinetic-987fae0a7fa7.herokuapp.com/graphql',
});

// Use the setContext function from Apollo to create a new link that attaches the user's token to the headers of each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up the Apollo client with the created link and a new instance of InMemoryCache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user has a token in local storage, if they do, consider them logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Helper function to handle logging in: save the token to local storage and update state
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Helper function to handle logging out: remove the token from local storage and update state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    // Provide the Apollo client to the components in the React app
    <ApolloProvider client={client}>
      <div>
        {/* Set up React Router with paths for the app's pages */}
        <BrowserRouter>
          <Routes>
            {/* Show the Main component if logged in, otherwise show the Login component */}
            <Route path="/" element={isLoggedIn ? <Main onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />  
            {/* Login route. Pass down the login handler and isLoggedIn state */}
            <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
            {/* Main route. Pass down the logout handler */}
            <Route path="/main" element={<Main onLogout={handleLogout} />} />
            {/* Registration route */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
