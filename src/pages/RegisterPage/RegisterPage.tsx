import React from 'react';

import MainLayout from '@/layouts/MainLayout';
import RegisterForm from '@/pages/RegisterPage/components/RegisterForm';

const RegisterPage = () => {
    return (
        <div>
            <MainLayout>
                <RegisterForm />
            </MainLayout>
        </div>
    );
};

export default RegisterPage;
