import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { PageContacts } from 'pages/PageContacts/PageContacts';
import { Homepage } from 'pages/Homepage/Homepage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { PrivateRouter } from 'hoc/PrivateRoute';
import { PublicRoute } from 'hoc/PublicRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/auth/operations';

export const App = () => {
  const dispatch = useDispatch();

  //useEffect для проверки токена
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route
          path="contacts"
          element={
            <PrivateRouter>
              <PageContacts />
            </PrivateRouter>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<h1>404 --- Page not found</h1>} />
      </Route>
    </Routes>
  );
};
