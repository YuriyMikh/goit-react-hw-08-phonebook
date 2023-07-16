import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { PageContacts } from 'pages/PageContacts/PageContacts';
import { Homepage } from 'pages/Homepage/Homepage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { PrivateRouter } from 'hoc/PrivateRoute';
import { PublicRoute } from 'hoc/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/auth/operations';
import { selectIsRefresh } from 'redux/auth/selectors';
import { ThreeCircles } from 'react-loader-spinner';
import { Spinner } from './App.styled';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh); //вытягиваем состояние, или true или false

  //useEffect для проверки токена
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? ( //эта проверка для того чтобы не выскакивал экран логина при перезагрузке страницы контактов (когда залогинен)
    <Spinner>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      <h1>Loading...</h1>
    </Spinner>
  ) : (
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
