import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingSpinner from '@/layouts/LoadingSpinner';
import CompanyMembersPage from '@/pages/CompanyMembersPage';
import CompanyRegisterPage from '@/pages/CompanyRegisterPage';
import CreateFormPage from '@/pages/CreateFormPage/CreateFormPage';
import FormListPage from '@/pages/FormListPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import NewResponsePage from '@/pages/NewResponsePage';
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
const DashboardLandingPage = React.lazy(() => import('@/pages/DashboardLandingPage'));
const InviteEmployeesPage = React.lazy(() => import('@/pages/InviteEmployeesPage'));
const UpdateCompanyProfilePage = React.lazy(() => import('@/pages/UpdateCompanyProfilePage'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));
const UserProfilePage = React.lazy(() => import('@/pages/UserProfilePage'));
const ChangePasswordPage = React.lazy(() => import('@/pages/ChangePasswordPage'));

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
                    <Route
                        path="/companies/:companyId/invite-employees/:token"
                        element={<CreateEmployeePage />}
                    />
                </Route>
                <Route path="/companyRegister" element={<CompanyRegisterPage />} />
                <Route
                    path="/companies/:companyId/users/:userId/company-employees"
                    element={<CompanyMembersPage />}
                />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/users/resetPassword/:token" element={<ResetPasswordPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/user-profile" element={<UserProfilePage />} />
                    <Route path="/user-profile/change-password" element={<ChangePasswordPage />} />
                    <Route
                        path="/company-profile/:userId"
                        element={<CompanyProfileStepperPage />}
                    />
                    <Route path="/forms" element={<FormListPage />} />
                    <Route path="/create-form" element={<CreateFormPage />} />
                    <Route path="/newResponse/:formId" element={<NewResponsePage />} />
                    <Route element={<CompanyDashboardRoute />}>
                        <Route
                            path="/companies/:companyId/dashboard"
                            element={<DashboardLandingPage />}
                        />
                        <Route
                            path="/companies/:companyId/invite-employees"
                            element={<InviteEmployeesPage />}
                        />
                        <Route element={<SuperAdminRoute />}>
                            <Route
                                path="/companies/:companyId/users/:userId/update-company-profile"
                                element={<UpdateCompanyProfilePage />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
);
export default AppRoute;
