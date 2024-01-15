import React from 'react';

import Footer from '@/layouts/Footer/Footer';
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
            <Footer />
        </div>
    );
};

export default CreateEmployeePage;
