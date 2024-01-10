import React from 'react';

import { useParams } from 'react-router-dom';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ResetPasswordForm from '@/pages/ResetPasswordPage/components/ResetPasswordForm';

const ResetPasswordPage = () => {
    const { token } = useParams<{ token?: string }>();
    return (
        <div>
            <Header />
            <MainLayout>
                <ResetPasswordForm token={token} />
            </MainLayout>
        </div>
    );
};

export default ResetPasswordPage;
