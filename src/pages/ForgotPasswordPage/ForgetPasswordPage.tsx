import React from 'react';

import Footer from '@/layouts/Footer/Footer';
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
            <Footer />
        </div>
    );
};

export default ForgetPasswordPage;
