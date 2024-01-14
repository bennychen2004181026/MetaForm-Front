import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/LoginPage/components/login';

const LoginPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <Login />
            </MainLayout>
        </div>
    );
};

export default LoginPage;
