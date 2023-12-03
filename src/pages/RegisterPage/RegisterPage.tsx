import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import RegisterForm from '@/pages/RegisterPage/components/RegisterForm';

const RegisterPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <RegisterForm />
            </MainLayout>
        </div>
    );
};

export default RegisterPage;
