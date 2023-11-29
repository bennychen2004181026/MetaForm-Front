import React from 'react';

import RegisterForm from '@/components/RegisterForm';
import MainLayout from '@/layouts/MainLayout';

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
