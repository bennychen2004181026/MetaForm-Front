import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from '@/layouts/LoadingSpinner';
import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import MainPage from '@/pages/MainPage';

const EmailLinkVerificationPage = React.lazy(() => import('@/pages/EmailLinkVerificationPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const CompanyProfileStepperPage = React.lazy(() => import('@/pages/CompanyProfileStepperPage'));

const AppRoute = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/verification/:token" element={<EmailLinkVerificationPage />} />
                <Route path="/create-user" element={<RegisterPage />} />
                <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route path="/company-profile/:userId" element={<CompanyProfileStepperPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
);
export default AppRoute;
