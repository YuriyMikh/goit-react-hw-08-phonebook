import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginThunk } from 'redux/auth/operations';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  //вариант с деструктуризацией:
  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //вариант без деструктуризации
  //   const handleChangeInput = e => {
  //     setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  //   };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(credentials);
    dispatch(loginThunk(credentials));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px 6px',
        }}
      >
        {/* <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          Name
          <input
            style={{ padding: '5px' }}
            onChange={handleChangeInput}
            value={credentials.name}
            type="text"
            name="name"
            placeholder="enter you name..."
          />
        </label> */}

        <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          Email
          <input
            style={{ padding: '5px' }}
            onChange={handleChangeInput}
            value={credentials.email}
            type="email"
            name="email"
            placeholder="enter your email..."
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          Password
          <input
            style={{ padding: '5px' }}
            onChange={handleChangeInput}
            value={credentials.password}
            type="password"
            name="password"
            placeholder="enter your password..."
          />
        </label>
        <button style={{ padding: '5px 10px', marginTop: '20px' }}>
          Login
        </button>

        <hr />
        <h4>
          If you don't have an account go to <Link to="/register">Register</Link>
        </h4>
      </form>
    </div>
  );
};
