import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  // useNavigate
} from 'react-router-dom';
import { logoutThunk } from 'redux/auth/operations';
import { selectLoggedIn, selectUser } from 'redux/auth/selectors';
import { StyledHeader, StyledNav } from './NavBar.styled';

export const NavBar = () => {
  // const navigate = useNavigate(); //подтягиваем данный хук, чтобы организовать переход по страницам (например кнопка Register)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedIn); //вытягиваем состояния isLoggedIn из state
  const user = useSelector(selectUser); //получаем значение из user которое хранится в state

  return (
    <StyledHeader>
      <StyledNav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </StyledNav>

      <div>{isLoggedIn && <h3>hello, {user.name}</h3>}</div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* если пользователь не залогинен - показываю кнопки Login и Register*/}
        {!isLoggedIn ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          // если уже залогинен - показываю кнопку Exit
          <NavLink
            onClick={
              () => dispatch(logoutThunk()) //при клике на Exit вызываю и обрабатываю logoutThunk
              // .unwrap() //при успешном выполнении предыщей операции тут же вызываю следующую
              // .then(() => {
              //   navigate('/login'); //перебрасываю пользователя на страницу логина
              // })
            }
          >
            Exit
          </NavLink>
        )}
      </div>
    </StyledHeader>
  );
};
