import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', user)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="Login-wrapper">
      <div className="Login">
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
