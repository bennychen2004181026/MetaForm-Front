import React from 'react';

import CreateForm from '@/pages/CreateFormPage/components/CreateForm';
import { GlobalNewFormState } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';

const CreateFormPage = () => {
    return (
        <GlobalNewFormState>
            <CreateForm />
        </GlobalNewFormState>
    );
};

export default CreateFormPage;
