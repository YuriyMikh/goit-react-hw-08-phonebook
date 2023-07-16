import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectLoggedIn } from 'redux/auth/selectors';

export const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  const location = useLocation(); //через location прокидываем state, говорим откуда пришел пользователь

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />; //если пользователь на залогинен - отправь на логин (В) объекте передается информация что будет прокинута локация дальше на логин)
  }

  return children;
};
