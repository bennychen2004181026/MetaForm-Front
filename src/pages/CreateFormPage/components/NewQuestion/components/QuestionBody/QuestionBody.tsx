import React, { useContext } from 'react';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import { getQuestion } from '@/pages/CreateFormPage/components/NewQuestion/questionTypes';

const QuestionBody = () => {
    const { state } = useContext(NewQuestionContext);
    const { questionType } = state;

    const questionComponent = getQuestion(questionType);
    return <div>{questionComponent}</div>;
};

export default QuestionBody;
