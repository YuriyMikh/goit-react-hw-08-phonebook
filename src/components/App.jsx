import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { PageContacts } from 'pages/PageContacts/PageContacts';
import { Homepage } from 'pages/Homepage/Homepage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="contacts" element={<PageContacts />} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404 --- Page not found</h1>} />
      </Route>
    </Routes>
  );
};
