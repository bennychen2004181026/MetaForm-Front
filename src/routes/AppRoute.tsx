import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from '@/layouts/LoadingSpinner';
import CompanyMembersPage from '@/pages/CompanyMembersPage';
import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import CreateFormPage from '@/pages/CreateFormPage/CreateFormPage';
import FormListPage from '@/pages/FormListPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import RegisterEmailPage from '@/pages/RegisterEmailPage';
import RegisterOptionPage from '@/pages/RegisterOptionPage';

const EmailLinkVerificationPage = React.lazy(() => import('@/pages/EmailLinkVerificationPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const CompanyProfileStepperPage = React.lazy(() => import('@/pages/CompanyProfileStepperPage'));
const ForgotPasswordPage = React.lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage'));
const PublicRoute = React.lazy(() => import('@/components/PublicRoute'));
const CreateEmployeePage = React.lazy(() => import('@/pages/CreateEmployeePage'));
const ProtectedRoute = React.lazy(() => import('@/components/ProtectedRoute'));
const CompanyDashboardRoute = React.lazy(() => import('@/components/CompanyDashboardRoute'));
const SuperAdminRoute = React.lazy(() => import('@/components/SuperAdminRoute'));
const EmailVerificationPage = React.lazy(() => import('@/pages/EmailVerificationPage'));

const AppRoute = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register-option" element={<RegisterOptionPage />} />
                    <Route path="/register-email" element={<RegisterEmailPage />} />
                    <Route path="/email-verification" element={<EmailVerificationPage />} />
                    <Route
                        path="/users/verification/:token"
                        element={<EmailLinkVerificationPage />}
                    />
                    <Route path="/create-user" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/users/resetPassword/:token" element={<ResetPasswordPage />} />
                </Route>
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route path="/register-option" element={<RegisterOptionPage />} />
                <Route path="/forms" element={<FormListPage />} />
                <Route
                    path="/companies/:companyId/invite-employees/:token"
                    element={<CreateEmployeePage />}
                />
                <Route path="/create-form" element={<CreateFormPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/company-profile/:userId"
                        element={<CompanyProfileStepperPage />}
                    />
                    <Route path="/user-dashboard" />
                    <Route element={<CompanyDashboardRoute />}>
                        <Route path="/companies/:companyId/employees" />
                        <Route
                            path="/companies/:companyId/company-members"
                            element={<CompanyMembersPage />}
                        />
                        <Route path="/companies/:companyId/invite-employees" />
                        <Route element={<SuperAdminRoute />}>
                            <Route path="/companies/:companyId/users/:userId/update-company-profile" />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Suspense>
);
export default AppRoute;
