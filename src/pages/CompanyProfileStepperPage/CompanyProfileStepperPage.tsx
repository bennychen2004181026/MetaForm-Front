import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CompanyProfileStepper from '@/pages/CompanyProfileStepperPage/components/';

const CompanyProfileStepperPage = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <CompanyProfileStepper />
            </MainLayout>
        </div>
    );
};

export default CompanyProfileStepperPage;
