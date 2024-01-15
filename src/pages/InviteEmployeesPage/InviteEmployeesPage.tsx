import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import InviteUsers from '@/pages/InviteEmployeesPage/components/InviteUsers';

const InviteEmployeesPage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <MainLayout>
                <InviteUsers />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default InviteEmployeesPage;
