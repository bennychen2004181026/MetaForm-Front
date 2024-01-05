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

        dispatch({
            type: 'UPDATE_QUESTION',
            payload: { questionIndex: index, question: currentQuestion },
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
