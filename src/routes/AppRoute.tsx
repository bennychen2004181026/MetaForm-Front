import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from '@/layouts/LoadingSpinner';
import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import FormListPage from '@/pages/FormListPage';
import MainPage from '@/pages/MainPage';
import RegisterEmailPage from '@/pages/RegisterEmailPage';
import RegisterOptionPage from '@/pages/RegisterOptionPage';

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
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route path="/company-profile/:userId" element={<CompanyProfileStepperPage />} />
                <Route path="/registeremail" element={<RegisterEmailPage />} />
                <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route path="/registeroption" element={<RegisterOptionPage />} />
                <Route path="/forms" element={<FormListPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
);
export default AppRoute;
