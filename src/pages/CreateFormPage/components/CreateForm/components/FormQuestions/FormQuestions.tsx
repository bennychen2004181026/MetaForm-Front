import React, { useContext, useState } from 'react';

import { IQuestion } from '@/interfaces/CreateForm.interface';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import { GlobalState as GlobalQuestionState } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const FormQuestions = () => {
    const { dispatch, state } = useContext(NewFormGlobalContext);
    const { numberOfQuestions, questions } = state;
    const [draggingQuestion, setDraggingQuestion] = useState<null | IQuestion>(null);
    console.log(questions);
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, draggingQuestionIndex: number) => {
        const question = questions[draggingQuestionIndex];
        setDraggingQuestion(question);
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingQuestion(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (targetQuestionIndex: number) => {
        const targetQuestion = questions[targetQuestionIndex];
        if (!draggingQuestion) return;

        const currentIndex = questions.indexOf(draggingQuestion);
        const targetIndex = questions.indexOf(targetQuestion);

        if (currentIndex !== -1 && targetIndex !== -1) {
            questions.splice(currentIndex, 1);
            questions.splice(targetIndex, 0, draggingQuestion);
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questions,
            });
        }
    };
    return (
        <div>
            {[...Array(numberOfQuestions)].map((e, i) => {
                const questionId = Math.floor(Math.random() * 1000000).toString();
                return (
                    <GlobalQuestionState key={e}>
                        <NewQuestion questionId={questionId} />
                    </GlobalQuestionState>
                );
            })}
        </div>
    );
};

export default FormQuestions;
