import React, { useContext, useState } from 'react';

import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';

import AddQuestion from './components/AddQuestion';
import SubmitButton from '@/components/SubmitButton';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import {
    GlobalNewFormState,
    NewFormGlobalContext,
} from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import { addNewForm } from '@/store/slices/form/formSlice';
import { AppDispatch } from '@/store/store';

const CreateForm = () => {
    const { state: currentForm } = useContext(NewFormGlobalContext);
    const [, setAddRequestStatus] = useState('idle');
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = () => {
        try {
            setAddRequestStatus('pending');
            const { title, description, expire, createdBy, validFrom } = currentForm;
            const questions = ['659a80908452e4e167e11c44'];
            dispatch(
                addNewForm({ title, description, expire, createdBy, validFrom, questions }),
            ).unwrap();
        } catch (err) {
            // console.error('Failed to save the form', err);
        } finally {
            setAddRequestStatus('idle');
        }
    };
    return (
        <GlobalNewFormState>
            <Container>
                <ConditionalSectionContainer backgroundColor="#03787c">
                    <FormTitleField />
                </ConditionalSectionContainer>
                <ConditionalSectionContainer backgroundColor="#03787c">
                    <FormQuestions />
                    <AddQuestion />
                </ConditionalSectionContainer>
                <SubmitButton isValid text="Save Form" handleSubmit={handleSubmit} />
            </Container>
        </GlobalNewFormState>
    );
};
export default CreateForm;
