import React from 'react';

import CheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/CheckboxesQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import QuestionContainer from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionContainer';
import ShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ShortAnswerQuestion';

const SelectedQuestion = ({ selectedQuestionType }: { selectedQuestionType: number }) => {
    const getQuestion = () => {
        switch (selectedQuestionType) {
            case 0:
                return <MuitiChoiceQuestion isCheckbox={false} />;
            case 1:
                return <ShortAnswerQuestion />;
            case 4:
                return <CheckboxesQuestion />;
            default:
                return <MuitiChoiceQuestion isCheckbox={false} />;
        }
    };
    const question = getQuestion();
    return <QuestionContainer>{question}</QuestionContainer>;
};

export default SelectedQuestion;
