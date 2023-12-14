import React from 'react';

import MuitiChoiceQuestion from './components/NewQuestion/components/MultiChoiceQuestion';
import FormTitleField from '@/components/EditForm/FormTitleField';
import MainLayout from '@/layouts/MainLayout';

const CreateFormPage = () => {
    return (
        <div>
            <FormTitleField />
            <MainLayout>
                <MuitiChoiceQuestion />
            </MainLayout>
        </div>
    );
};

export default CreateFormPage;
