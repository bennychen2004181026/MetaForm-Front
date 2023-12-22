import React, { useContext } from 'react';

import Divider from '@mui/material/Divider';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import { getQuestion } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const QuestionBody = () => {
    const { state } = useContext(NewQuestionContext);
    const { questionType } = state;

    const questionComponent = getQuestion(questionType);
    return (
        <div>
            {questionComponent}
            <Divider />
        </div>
    );
};

export default QuestionBody;
