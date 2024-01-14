import React from 'react';

import { useParams } from 'react-router-dom';

import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CompanyProfileStepper from '@/pages/CompanyProfileStepperPage/components/';

const CompanyProfileStepperPage: React.FC = () => {
    const { userId } = useParams<{ userId?: string }>();
    return (
        <div>
            <Header />
            <MainLayout>
                <CompanyProfileStepper userId={userId} />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default CompanyProfileStepperPage;
