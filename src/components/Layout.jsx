import React from 'react';
import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
