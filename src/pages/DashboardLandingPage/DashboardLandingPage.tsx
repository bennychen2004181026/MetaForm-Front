import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CompanyIntros from '@/pages/DashboardLandingPage/components/CompanyIntros';

const DashboardLandingPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <CompanyIntros />
            </MainLayout>
        </div>
    );
};

export default DashboardLandingPage;
