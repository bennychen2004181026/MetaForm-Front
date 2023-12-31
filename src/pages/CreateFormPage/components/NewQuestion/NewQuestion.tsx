import React, { useContext, useEffect, useState } from 'react';

import QuestionBody from './components/QuestionBody/QuestionBody';
import { IQuestion } from '@/interfaces/CreateForm.interface';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';
import {
    GlobalState as GlobalQuestionState,
    NewQuestionContext,
} from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';
import GlobalStyle from '@/styles/GlobalStyle';

const NewQuestion = ({ questionId }: { questionId: string }) => {
    const { dispatch, state: form } = useContext(NewFormGlobalContext);
    const { state: question } = useContext(NewQuestionContext);
    console.log(questionId);
    console.log(question.questionId);

    const [draggingQuestion, setDraggingQuestion] = useState<null | IQuestion>(null);
    const { questions } = form;
    useEffect(() => {
        dispatch({
            type: 'ADD_QUESTION',
            payload: question,
        });
    }, []);

    // const handleDragStart = (e: React.DragEvent<HTMLDivElement>, startQuestion: IQuestion) => {
    //     setDraggingQuestion(startQuestion);
    //     e.dataTransfer.setData('text/plain', '');
    // };

    // const handleDragEnd = () => {
    //     setDraggingQuestion(null);
    // };

    // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    // };

    // const handleDrop = (targetQuestion: IQuestion) => {
    //     if (!draggingQuestion) return;

    //     const currentIndex = questions.indexOf(draggingQuestion);
    //     const targetIndex = questions.indexOf(targetQuestion);
    //     console.log(`current index: ${currentIndex}`);
    //     console.log(`target index: ${targetIndex}`);

    //     if (currentIndex !== -1 && targetIndex !== -1) {
    //         const newQuestions = [...questions];
    //         newQuestions.splice(currentIndex, 1);
    //         newQuestions.splice(targetIndex, 0, draggingQuestion);
    //         dispatch({
    //             type: 'SET_QUESTIONS',
    //             payload: newQuestions,
    //         });
    //     }
    // };
    return (
        <ConditionalSectionContainer elevation={1} square={false}>
            <div>
                <GlobalStyle />
                <QuestionTitle />
                <QuestionBody />
                <BottomToolbar />
            </div>
        </ConditionalSectionContainer>
    );
};
export default NewQuestion;
