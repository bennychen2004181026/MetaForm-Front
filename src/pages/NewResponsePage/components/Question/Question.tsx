import React from 'react';

import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IQuestionResponse } from '@/interfaces/CreateResponse';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import QuestionTitle from '@/pages/NewResponsePage/components/QuestionTitle';
import CheckBoxesQuestion from '@/pages/NewResponsePage/questions/CheckBoxesQuestion';
import DatePickerQuestion from '@/pages/NewResponsePage/questions/DatePickerQuestion';
import FileUploadQuestion from '@/pages/NewResponsePage/questions/FileUploadQuestion';
import MultiChoiceQuestion from '@/pages/NewResponsePage/questions/MultiChoiceQuestion';
import ShortAnswerQuestion from '@/pages/NewResponsePage/questions/ShortAnswerQuestion';
import TimePickerQuestion from '@/pages/NewResponsePage/questions/TimePickerQuestion';
import { getSubmitClicked } from '@/store/slices/formResponse/formResponseSlice';

const getQuestionBodyByType = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    switch (questionResponse.question.questionType) {
        case '0':
            return <MultiChoiceQuestion questionResponse={questionResponse} />;
        case '1':
            return <ShortAnswerQuestion questionResponse={questionResponse} />;
        case '2':
            return <ShortAnswerQuestion questionResponse={questionResponse} />;
        case '3':
            return <CheckBoxesQuestion questionResponse={questionResponse} />;
        case '4':
            return <FileUploadQuestion questionResponse={questionResponse} />;
        case '5':
            return <DatePickerQuestion />;
        case '6':
            return <TimePickerQuestion />;
        default:
            return <ShortAnswerQuestion questionResponse={questionResponse} />;
    }
};
const QuestionBodyContainer = styled.div`
    padding: 0 10px;
    margin-bottom: 40px;
    margin-top: 10px;
`;
const Question = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    const {
        question: { questionTitle, required },
        questionAnswered,
    } = questionResponse;
    const submitClicked = useSelector(getSubmitClicked);
    return (
        <ConditionalSectionContainer
            elevation={1}
            square={false}
            wariningBorderStyle={
                submitClicked && required && !questionAnswered ? 'solid 2px red' : ''
            }
        >
            <QuestionTitle questionTitle={questionTitle} />
            <QuestionBodyContainer>
                {getQuestionBodyByType({ questionResponse })}
            </QuestionBodyContainer>
            {submitClicked && required && !questionAnswered && (
                <Alert severity="error">This is a required question!</Alert>
            )}
        </ConditionalSectionContainer>
    );
};

export default Question;
