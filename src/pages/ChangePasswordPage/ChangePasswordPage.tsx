import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import ChangePasswordForm from '@/pages/ChangePasswordPage/components/ChangePasswordForm';

const ChangePasswordPage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <MainLayout>
                <ChangePasswordForm />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default ChangePasswordPage;
