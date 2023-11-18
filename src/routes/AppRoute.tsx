import React from 'react';

import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import SnackbarTestingPage from '@/pages/SnackbarTestingPage';

const AppRoute = () => (
    <>
        <SnackbarTestingPage />
        <LoginPage />
        <RegisterPage />
        <ForgetPasswordPage />
        <HomePage />
    </>
);

export default AppRoute;
