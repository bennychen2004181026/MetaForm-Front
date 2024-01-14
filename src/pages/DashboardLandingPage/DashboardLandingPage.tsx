import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CompanyIntros from '@/pages/DashboardLandingPage/components/CompanyIntros';

const DashboardLandingPage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <MainLayout>
                <CompanyIntros />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default DashboardLandingPage;
