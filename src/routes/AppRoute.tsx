import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from '@/layouts/LoadingSpinner';
import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import MainPage from '@/pages/MainPage';
import RegisterEmailPage from '@/pages/RegisterEmailPage';
import RegisterOptionPage from '@/pages/RegisterOptionPage';

const EmailLinkVerificationPage = React.lazy(() => import('@/pages/EmailLinkVerificationPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const CompanyProfileStepperPage = React.lazy(() => import('@/pages/CompanyProfileStepperPage'));
const ForgotPasswordPage = React.lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage'));

const AppRoute = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/verification/:token" element={<EmailLinkVerificationPage />} />
                <Route path="/create-user" element={<RegisterPage />} />
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route path="/company-profile/:userId" element={<CompanyProfileStepperPage />} />
                <Route path="/registeroption" element={<RegisterOptionPage />} />
                <Route path="/registeremail" element={<RegisterEmailPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
);
export default AppRoute;
