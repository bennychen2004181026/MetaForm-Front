import React from 'react';
import { Route as RouterPage, Routes, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';

const Route = () => (
    <Routes>
        <RouterPage path="/" element={<Navigate replace to="/LoginPage" />} />
        <LoginPage />
        <ForgetPasswordPage />
        <HomePage />
        <RegisterPage />
    </Routes>
);

export default Route;
