import React, { useContext } from 'react';

import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AddQuestion from './components/AddQuestion';
import SubmitButton from '@/components/SubmitButton';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import {
    FormStatus,
    addNewForm,
    getFormsError,
    getFormsStatus,
} from '@/store/slices/form/formSlice';
import { AppDispatch } from '@/store/store';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const CreateForm = () => {
    const { state: currentForm } = useContext(NewFormGlobalContext);
    const dispatch = useDispatch<AppDispatch>();
    const formsStatus = useSelector(getFormsStatus);
    const formError = useSelector(getFormsError);
    const showSnackbar = useSnackbarHelper();
    const handleSubmit = () => {
        try {
            const { formId, title, description, questions } = currentForm;
            dispatch(
                addNewForm({
                    formId,
                    title,
                    description,
                    questions,
                    createdBy: '659a9d5c8452e4e167e11c47',
                }),
            ).unwrap();
            if (formsStatus === FormStatus.FAILED) {
                showSnackbar(`Failed to create form: ${formError}`, 'error');
            }
            if (formsStatus === FormStatus.SUCCESS) {
                showSnackbar(`Form created successfully`, 'success');
            }
        } catch (err) {
            showSnackbar(`message: ${err}`, 'error');
        }
    };

    return (
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
    );
};
export default CreateForm;
