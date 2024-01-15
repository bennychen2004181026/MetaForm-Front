import React from 'react';

import Footer from '@/layouts/Footer/Footer';
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
            <Footer />
        </div>
    );
};

export default LoginPage;
