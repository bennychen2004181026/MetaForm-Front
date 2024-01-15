import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import UpdateCompanyProfileForm from '@/pages/UpdateCompanyProfilePage/components/UpdateCompanyProfileForm';

const UpdateCompanyProfilePage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <MainLayout>
                <UpdateCompanyProfileForm />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default UpdateCompanyProfilePage;
