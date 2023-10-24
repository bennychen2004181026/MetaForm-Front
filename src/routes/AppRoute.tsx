import React from 'react';

import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

const AppRoute = () => (
    <>
        <LoginPage />
        <RegisterPage />
        <ForgetPasswordPage />
        <HomePage />
    </>
);

export default AppRoute;
