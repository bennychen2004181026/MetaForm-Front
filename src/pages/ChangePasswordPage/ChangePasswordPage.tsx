import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ChangePasswordForm from '@/pages/ChangePasswordPage/components/ChangePasswordForm';

const ChangePasswordPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <ChangePasswordForm />
            </MainLayout>
        </div>
    );
};

export default ChangePasswordPage;
