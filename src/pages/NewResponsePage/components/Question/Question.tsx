import React from 'react';

import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { IAnswer, IQuestionProps, IQuestionResponse } from '@/interfaces/CreateResponse';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import QuestionTitle from '@/pages/NewResponsePage/components/QuestionTitle';
import CheckBoxesQuestion from '@/pages/NewResponsePage/questions/CheckBoxesQuestion';
import DatePickerQuestion from '@/pages/NewResponsePage/questions/DatePickerQuestion';
import FileUploadQuestion from '@/pages/NewResponsePage/questions/FileUploadQuestion';
import MultiChoiceQuestion from '@/pages/NewResponsePage/questions/MultiChoiceQuestion';
import ShortAnswerQuestion from '@/pages/NewResponsePage/questions/ShortAnswerQuestion';
import TimePickerQuestion from '@/pages/NewResponsePage/questions/TimePickerQuestion';
import {
    getSubmitClicked,
    saveQuestionAnswer,
} from '@/store/slices/formResponse/formResponseSlice';
import { AppDispatch } from '@/store/store';

const getQuestionBodyByType = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    switch (questionResponse.question.questionType) {
        case '0':
            return (
                <MultiChoiceQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '1':
            return (
                <ShortAnswerQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '2':
            return (
                <ShortAnswerQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '3':
            return (
                <CheckBoxesQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '4':
            return (
                <FileUploadQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '5':
            return (
                <DatePickerQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        case '6':
            return (
                <TimePickerQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
        default:
            return (
                <ShortAnswerQuestion
                    questionResponse={questionResponse}
                    onAnswerChange={onAnswerChange}
                />
            );
    }
};
const QuestionBodyContainer = styled.div`
    margin-bottom: 40px;
    margin-top: 30px;
`;
const Question = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    const {
        question: { questionTitle, required },
        questionAnswered,
    } = questionResponse;
    const submitClicked = useSelector(getSubmitClicked);
    const dispatch = useDispatch<AppDispatch>();

    const onAnswerChange = (answer: IAnswer) => {
        dispatch(saveQuestionAnswer(answer));
    };
    const questionProps: IQuestionProps = { questionResponse, onAnswerChange };
    return (
        <ConditionalSectionContainer elevation={1} square={false}>
            <QuestionTitle questionTitle={questionTitle} />
            <QuestionBodyContainer>{getQuestionBodyByType(questionProps)}</QuestionBodyContainer>
            {submitClicked && required && !questionAnswered && (
                <Alert severity="error">This is a required question!</Alert>
            )}
        </ConditionalSectionContainer>
    );
};

export default Question;
export type { IQuestionProps };
