import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginThunk } from 'redux/auth/operations';
import { selectLoggedIn } from 'redux/auth/selectors';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector(selectLoggedIn);
  // console.log(location);

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
    dispatch(loginThunk(credentials)) //при клике на Login вызываю и обрабатываю loginThunk
      .unwrap() //при успешном выполнении предыщей операции тут же вызываю следующую
      .then(() => {
        toast.success('Welcome back :)');
      });
  };

  //перебрасываем пользователя на маршрут из хука useLocation.
  //***??? */ В файле App.jsx страницу < PageContacts /> нужно обернуть в приватный роутер, иначе работать не будет
  if (isLoggedIn) {
    return <Navigate to={location.state?.from ?? '/'} />;
  }
  //***??? */ navigate(location.state?.from ?? '/'); //если страница открыта в новом окне. Нужна проверка. Если нет state (если у нас нет from), тогда отправляем пользователя на стартовую страницу

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
          If you don't have an account go to{' '}
          <Link to="/register">Register</Link>
        </h4>
      </form>
    </div>
  );
};
