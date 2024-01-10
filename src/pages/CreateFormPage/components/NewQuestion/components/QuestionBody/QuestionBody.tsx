import React, { useContext } from 'react';

import Divider from '@mui/material/Divider';
import styled from 'styled-components';

import { getQuestion } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const QuestionBodyContainer = styled.div`
    padding: 0 10px;
    margin-bottom: 40px;
    margin-top: 10px;
`;
const QuestionBodyDivider = styled.div`
    margin-bottom: 10px;
`;
const QuestionBody = () => {
    const { state } = useContext(NewQuestionContext);
    const { questionType } = state;

    const questionComponent = getQuestion(questionType);
    return (
        <div>
            <QuestionBodyContainer>{questionComponent}</QuestionBodyContainer>
            <QuestionBodyDivider>
                <Divider />
            </QuestionBodyDivider>
        </div>
    );
};

export default QuestionBody;
