import React, { useContext, useState } from 'react';

import DragHandleIcon from '@mui/icons-material/DragHandle';
import styled from 'styled-components';

import { IQuestion } from '@/interfaces/CreateForm';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import { GlobalState as GlobalQuestionState } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const StyledDragIcon = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
`;
const FormQuestions = () => {
    const { dispatch, state } = useContext(NewFormGlobalContext);
    const { questions } = state;
    const [draggable, setDraggable] = useState(false);
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
                            draggable={draggable}
                            onDragStart={(e) => handleDragStart(e, question)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(question)}
                        >
                            <ConditionalSectionContainer elevation={1} square={false}>
                                <StyledDragIcon>
                                    <DragHandleIcon
                                        onMouseDown={() => setDraggable(true)}
                                        onMouseUp={() => setDraggable(false)}
                                    />
                                </StyledDragIcon>
                                <NewQuestion />
                            </ConditionalSectionContainer>
                        </div>
                    </GlobalQuestionState>
                );
            })}
        </div>
    );
};

export default FormQuestions;
