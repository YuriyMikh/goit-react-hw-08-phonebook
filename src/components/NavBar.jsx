import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutThunk } from 'redux/auth/operations';
import { selectLoggedIn, selectUser } from 'redux/auth/selectors';

export const NavBar = () => {
  const navigate = useNavigate(); //подтягиваем данный хук, чтобы организовать переход по страницам (например кнопка Register)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedIn); //вытягиваем состояния isLoggedIn из state
  const user = useSelector(selectUser); //получаем значение из user которое хранится в state

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

      <div>{isLoggedIn && <h3>hello, {user.name}</h3>}</div>

      <div style={{ display: 'flex', gap: '5px' }}>
        {/* если пользователь не залогинен - показываю кнопки Login и Register*/}
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        ) : (
          // если уже залогинен - показываю кнопку Exit
          <button
            onClick={() =>
              dispatch(logoutThunk()) //при клике на Exit вызываю и обрабатываю logoutThunk
                .unwrap() //при успешном выполнении предыщей операции тут же вызываю следующую
                .then(() => {
                  navigate('/login'); //перебрасываю пользователя на страницу логина
                })
            }
          >
            Exit
          </button>
        )}
      </div>
    </header>
  );
};
