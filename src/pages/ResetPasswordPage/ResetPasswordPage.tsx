import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ResetPasswordForm from '@/pages/ResetPasswordPage/components/ResetPasswordForm';

const ResetPasswordPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <ResetPasswordForm />
            </MainLayout>
        </div>
    );
};

export default ResetPasswordPage;
