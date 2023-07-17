import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Link
  // , useNavigate
} from 'react-router-dom';
import { registerThunk } from 'redux/auth/operations';

export const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    dispatch(registerThunk(credentials))
      // .unwrap()
      // .then(() => navigate('/contacts'));
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
        <label
          style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
        >
          Name
          <input
            style={{ padding: '5px' }}
            onChange={handleChangeInput}
            value={credentials.name}
            type="text"
            name="name"
            placeholder="enter you name..."
          />
        </label>

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
          Register
        </button>
        <hr />
        <h4>
          If you already have an account lets to <Link to="/login">Login</Link>
        </h4>
      </form>
    </div>
  );
};
