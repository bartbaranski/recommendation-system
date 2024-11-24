// src/Register.js

import React, { useState } from 'react';
import axios from 'axios';

function Register({ setRegistered }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/register/', {
      username,
      email,
      password,
    })
    .then(response => {
      console.log(response.data);
      setRegistered(true);  // Proceed to login after successful registration
    })
    .catch(error => {
      console.error(error.response.data);
    });
  };

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
