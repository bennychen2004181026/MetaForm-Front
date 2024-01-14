import React from 'react';

import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import CreateForm from '@/pages/CreateFormPage/components/CreateForm';
import { GlobalNewFormState } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';

const CreateFormPage = () => {
    return (
        <div>
            <Header />
            <SidebarButton />
            <GlobalNewFormState>
                <CreateForm />
            </GlobalNewFormState>
            <Footer />
        </div>
    );
};

export default CreateFormPage;
