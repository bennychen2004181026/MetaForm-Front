import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

const AppRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoute;
