import React, { useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import FormHeader from './components/FormHeader';
import SidebarButton from '@/components/SidebarButton/SidebarButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import Question from '@/pages/NewResponsePage/components/Question';
import {
    fetchFormById,
    fetchQuestions,
    getFormQuestions,
    submitForm,
} from '@/store/slices/formResponse/formResponseSlice';
import { AppDispatch } from '@/store/store';
import GlobalStyle from '@/styles/GlobalStyle';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const CenteredSubmitButton = styled(Button)`
    margin: 0 auto;
    display: block;
`;

const CenteredBox = styled(Box)`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding: 0 0 90px 0;
`;
const NewResponsePage = () => {
    const { formId } = useParams();
    const showSnackbar = useSnackbarHelper();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const form = async () => {
            await dispatch(fetchFormById(formId || '65a1589de1630c848ccb3d98'))
                .then(async (response) => {
                    await dispatch(fetchQuestions(response.payload.questions));
                })
                .catch((err) => {
                    showSnackbar(`Fetched form data failed,${err}`, 'error');
                });
        };
        form();
    }, []);
    const questionResponses = useSelector(getFormQuestions);

    const handleSubmitForm = () => {
        dispatch(submitForm());
    };
    return (
        <div>
            <Header />
            <SidebarButton />
            <GlobalStyle />
            <CenteredBox>
                <ConditionalSectionContainer backgroundColor="#03787c">
                    <FormHeader />
                    {questionResponses.map((questionResponse) => (
                        <Question
                            key={questionResponse.question._id}
                            questionResponse={questionResponse}
                        />
                    ))}
                </ConditionalSectionContainer>
                <CenteredSubmitButton onClick={handleSubmitForm} variant="contained">
                    Submit response
                </CenteredSubmitButton>
            </CenteredBox>
            <Footer />
        </div>
    );
};

export default NewResponsePage;
