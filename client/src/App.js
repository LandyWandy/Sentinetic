import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Register from "./components/register";
import Login from "./components/login";
import {
  useMutation,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Main onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
            />
            <Route path="/main" element={<Main onLogout={handleLogout} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
