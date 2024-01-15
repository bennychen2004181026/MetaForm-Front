import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import UserProfileMain from '@/pages/UserProfilePage/components/UserProfileMain';

const UserProfilePage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <MainLayout>
                <UserProfileMain />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
