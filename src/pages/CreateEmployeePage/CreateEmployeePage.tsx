import React from 'react';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CreateEmployeeStepper from '@/pages/CreateEmployeePage/components/';

const CreateEmployeePage: React.FC = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <CreateEmployeeStepper />
            </MainLayout>
        </div>
    );
};

export default CreateEmployeePage;
