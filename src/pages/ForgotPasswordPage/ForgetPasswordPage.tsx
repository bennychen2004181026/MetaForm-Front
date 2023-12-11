import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ForgotPasswordForm from '@/pages/ForgotPasswordPage/components/ForgotPasswordForm';

const ForgetPasswordPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <ForgotPasswordForm />
            </MainLayout>
        </div>
    );
};

export default ForgetPasswordPage;
