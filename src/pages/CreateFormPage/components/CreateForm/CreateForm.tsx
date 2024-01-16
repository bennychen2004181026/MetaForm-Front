import React, { useContext } from 'react';

import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AddQuestion from './components/AddQuestion';
import SubmitButton from '@/components/SubmitButton';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import {
    FormStatus,
    addNewForm,
    getCreateFormsError,
    getCreateFormsStatus,
} from '@/store/slices/createForm/createFormSlice';
import { AppDispatch } from '@/store/store';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0 80px 0;
`;

const CreateForm = () => {
    const { state: currentForm } = useContext(NewFormGlobalContext);
    const dispatch = useDispatch<AppDispatch>();
    const createFormsStatus = useSelector(getCreateFormsStatus);
    const createFormError = useSelector(getCreateFormsError);
    const showSnackbar = useSnackbarHelper();

    const handleSubmit = async () => {
        try {
            const { formId, title, description, questions } = currentForm;
            await dispatch(
                addNewForm({
                    formId,
                    title,
                    description,
                    questions,
                    createdBy: '659a9d5c8452e4e167e11c47',
                }),
            ).unwrap();
            if (createFormsStatus === FormStatus.FAILED) {
                showSnackbar(`Failed to create form: ${createFormError}`, 'error');
            }
            if (createFormsStatus === FormStatus.SUCCESS) {
                showSnackbar(`Form created successfully`, 'success');
            }
        } catch (err) {
            showSnackbar(`message: ${err}`, 'error');
        }
    };

    return (
        <StyledContainer>
            <SubmitButton isValid text="Save Form" handleSubmit={handleSubmit} />
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormQuestions />
                <AddQuestion />
            </ConditionalSectionContainer>
            <SubmitButton isValid text="Save Form" handleSubmit={handleSubmit} />
        </StyledContainer>
    );
};
export default CreateForm;
