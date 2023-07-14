import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate(); //подтягиваем данный хук, чтобы организовать переход по страницам (например кнопка Register)
  return (
    <header
      style={{
        display: 'flex',
        backgroundColor: 'lightgrey',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
      }}
    >
      <nav style={{ display: 'flex', gap: '12px' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </nav>
      <div>
        <h1>Hello, example@mail.com</h1>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
        <button>Exit</button>
      </div>
    </header>
  );
};
