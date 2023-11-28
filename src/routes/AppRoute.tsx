import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import HomePage from '@/pages/HomePage';
import MainPage from '@/pages/MainPage';
import RegisterPage from '@/pages/RegisterPage';

const AppRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/userHome" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
            <Route path="/companyRegister" element={<CompanyRegisterPage />} />
        </Routes>
    </BrowserRouter>
);
export default AppRoute;
