import React, { useContext, useState } from 'react';

import { IQuestion } from '@/interfaces/CreateForm.interface';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import { GlobalState as GlobalQuestionState } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const FormQuestions = () => {
    const { dispatch, state } = useContext(NewFormGlobalContext);
    const { questions } = state;
    const [draggingQuestion, setDraggingQuestion] = useState<null | IQuestion>(null);
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, dragQuestion: IQuestion) => {
        setDraggingQuestion(dragQuestion);
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingQuestion(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (targetQuestion: IQuestion) => {
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
            {questions.map((question) => {
                return (
                    <GlobalQuestionState questionState={question} key={question.questionId}>
                        <div
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, question)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(question)}
                        >
                            <NewQuestion />
                        </div>
                    </GlobalQuestionState>
                );
            })}
        </div>
    );
};

export default FormQuestions;
