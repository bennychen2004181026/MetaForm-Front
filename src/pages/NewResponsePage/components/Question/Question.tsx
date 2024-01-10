import React from 'react';

import styled from 'styled-components';

import { IQuestion } from '@/interfaces/CreateForm';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import QuestionTitle from '@/pages/NewResponsePage/components/QuestionTitle';
import CheckBoxesQuestion from '@/pages/NewResponsePage/questions/CheckBoxesQuestion';
import DatePickerQuestion from '@/pages/NewResponsePage/questions/DatePickerQuestion';
import FileUploadQuestion from '@/pages/NewResponsePage/questions/FileUploadQuestion';
import MultiChoiceQuestion from '@/pages/NewResponsePage/questions/MultiChoiceQuestion';
import ParagraphQuestion from '@/pages/NewResponsePage/questions/ParagraphQuestion';
import ShortAnswerQuestion from '@/pages/NewResponsePage/questions/ShortAnswerQuestion';
import TimePickerQuestion from '@/pages/NewResponsePage/questions/TimePickerQuestion';

const getQuestionBodyByType = ({ question }: { question: IQuestion }) => {
    switch (question.questionType) {
        case '0':
            return <MultiChoiceQuestion question={question} />;
        case '1':
            return <ShortAnswerQuestion required={question.required} />;
        case '2':
            return <ParagraphQuestion required={question.required} />;
        case '3':
            return <CheckBoxesQuestion />;
        case '4':
            return <FileUploadQuestion />;
        case '5':
            return <DatePickerQuestion />;
        case '6':
            return <TimePickerQuestion />;
        default:
            return <ShortAnswerQuestion required={question.required} />;
    }
};
const QuestionBodyContainer = styled.div`
    padding: 0 10px;
    margin-bottom: 40px;
    margin-top: 10px;
`;
const Question = ({ question }: { question: IQuestion }) => {
    return (
        <ConditionalSectionContainer elevation={1} square={false}>
            <QuestionTitle questionTitle={question.questionTitle} />
            <QuestionBodyContainer>{getQuestionBodyByType({ question })} </QuestionBodyContainer>
        </ConditionalSectionContainer>
    );
};

export default Question;
