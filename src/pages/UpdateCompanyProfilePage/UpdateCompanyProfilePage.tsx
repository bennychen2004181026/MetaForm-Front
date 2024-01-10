import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import UpdateCompanyProfileForm from '@/pages/UpdateCompanyProfilePage/components/UpdateCompanyProfileForm';

const UpdateCompanyProfilePage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <UpdateCompanyProfileForm />
            </MainLayout>
        </div>
    );
};

export default UpdateCompanyProfilePage;
