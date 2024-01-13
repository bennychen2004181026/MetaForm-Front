import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import UserProfileMain from '@/pages/UserProfilePage/components/UserProfileMain';

const UserProfilePage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <UserProfileMain />
            </MainLayout>
        </div>
    );
};

export default UserProfilePage;
