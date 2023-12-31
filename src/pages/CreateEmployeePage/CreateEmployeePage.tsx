import React from 'react';

import { useParams } from 'react-router-dom';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import CreateEmployeeStepper from '@/pages/CreateEmployeePage/components/';

const CreateEmployeePage: React.FC = () => {
    const { companyId, token } = useParams<{
        companyId: string | undefined;
        token: string | undefined;
    }>();
    return (
        <div>
            <Header />
            <MainLayout>
                <CreateEmployeeStepper companyId={companyId} token={token} />
            </MainLayout>
        </div>
    );
};

export default CreateEmployeePage;
