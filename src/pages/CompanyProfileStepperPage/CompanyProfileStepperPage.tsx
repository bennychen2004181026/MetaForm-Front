import React from 'react';

import { useParams } from 'react-router-dom';

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
        </div>
    );
};

export default CompanyProfileStepperPage;
