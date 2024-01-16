import React from 'react';

import Footer from '@/layouts/Footer/Footer';
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
            <Footer />
        </div>
    );
};

export default RegisterPage;
