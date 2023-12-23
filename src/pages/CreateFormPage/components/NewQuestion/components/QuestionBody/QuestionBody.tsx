import React, { useContext } from 'react';

import Divider from '@mui/material/Divider';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import { getQuestion } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const QuestionBodyContainer = styled.div`
    margin-bottom: 40px;
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
