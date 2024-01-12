import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FormHeader from './components/FormHeader';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import Question from '@/pages/NewResponsePage/components/Question';
import {
    fetchFormById,
    fetchQuestions,
    getFormQuestions,
} from '@/store/slices/formResponse/formResponseSlice';
import { AppDispatch } from '@/store/store';
import GlobalStyle from '@/styles/GlobalStyle';

const NewResponsePage = () => {
    const formId = '65a1589de1630c848ccb3d98';
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const form = async () => {
            await dispatch(fetchFormById(formId)).then(async (response) => {
                await dispatch(fetchQuestions(response.payload.questions));
            });
        };
        form();
    }, []);
    const questions = useSelector(getFormQuestions);
    return (
        <div>
            <GlobalStyle />
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormHeader />
                {questions.map((question) => (
                    <Question key={question.questionId} question={question} />
                ))}
            </ConditionalSectionContainer>
        </div>
    );
};

export default NewResponsePage;
