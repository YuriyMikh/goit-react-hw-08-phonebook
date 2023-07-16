import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedIn } from 'redux/auth/selectors';

export const PublicRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectLoggedIn)
    
    //если пользователь залогинен - отправляем его на стартовую страницу, если нет - отправляем на чилдренов
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }
  
    return children;
};
