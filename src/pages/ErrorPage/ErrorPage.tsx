import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ErrorPageMain from '@/pages/ErrorPage/components/ErrorPageMain';

const ErrorPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <ErrorPageMain />
            </MainLayout>
        </div>
    );
};

export default ErrorPage;
