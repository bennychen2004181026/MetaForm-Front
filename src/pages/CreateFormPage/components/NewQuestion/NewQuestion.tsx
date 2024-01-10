import React, { useContext, useEffect } from 'react';

import QuestionBody from './components/QuestionBody/QuestionBody';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';
import GlobalStyle from '@/styles/GlobalStyle';

const NewQuestion = () => {
    const { state: form, dispatch } = useContext(NewFormGlobalContext);
    const { state: currentQuestion } = useContext(NewQuestionContext);
    useEffect(() => {
        const index = form.questions.findIndex(
            (question) => question.questionId === currentQuestion.questionId,
        );
        const newQuestions = [...form.questions];
        newQuestions[index] = currentQuestion;
        dispatch({
            type: 'UPDATE_QUESTION',
            payload: newQuestions,
        });
    }, [currentQuestion]);
    return (
        <div>
            <GlobalStyle />
            <QuestionTitle />
            <QuestionBody />
            <BottomToolbar />
        </div>
    );
};
export default NewQuestion;
