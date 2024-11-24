// src/Login.js

import React, { useState } from 'react';
import axiosInstance from './axiosInstance';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    axiosInstance.post('api-auth/login/', {
      username,
      password,
    })
    .then(response => {
      console.log(response.data);
      setLoggedIn(true);
    })
    .catch(error => {
      console.error(error.response.data);
    });
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
