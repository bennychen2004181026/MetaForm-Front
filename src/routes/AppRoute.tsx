import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import MainPage from '@/pages/MainPage';

const EmailLinkVerificationPage = React.lazy(() => import('@/pages/EmailLinkVerificationPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));

const AppRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/verification/:token" element={<EmailLinkVerificationPage />} />
            <Route path="/create-user" element={<RegisterPage />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
            <Route path="/companyRegister" element={<CompanyRegisterPage />} />
        </Routes>
    </BrowserRouter>
);
export default AppRoute;
