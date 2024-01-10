import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import InviteUsers from '@/pages/InviteEmployeesPage/components/InviteUsers';

const InviteEmployeesPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <InviteUsers />
            </MainLayout>
        </div>
    );
};

export default InviteEmployeesPage;
