import React, { createContext, useContext, useState } from 'react';

import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { IQuestion } from '@/interfaces/CreateForm.interface';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import store from '@/store';
import { RootState } from '@/store/store';

const FormQuestions = () => {
    // const formQuestions = useSelector((state: RootState) => state.newForm.questions);
    const { dispatch, state } = useContext(NewFormGlobalContext);
    const { questions } = state;
    // const [draggingOption, setDraggingOption] = useState<null | IQuestion>(null);
    // const handleDragStart = (e: React.DragEvent<HTMLDivElement>, option: IQuestion) => {
    //     setDraggingOption(option);
    //     e.dataTransfer.setData('text/plain', '');
    // };

    // const handleDragEnd = () => {
    //     setDraggingOption(null);
    // };

    // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    // };

    // const handleDrop = (targetQuestion: IQuestion) => {
    //     if (!draggingOption) return;

    //     const currentIndex = formQuestions.indexOf(draggingOption);
    //     const targetIndex = formQuestions.indexOf(targetQuestion);

    //     if (currentIndex !== -1 && targetIndex !== -1) {
    //         formQuestions.splice(currentIndex, 1);
    //         formQuestions.splice(targetIndex, 0, draggingOption);
    //         dispatch({
    //             type: 'SET_QUESTIONS',
    //             payload: formQuestions,
    //         });
    //     }
    // };
    return (
        <Container>
            {questions.map((question) => (
                <ConditionalSectionContainer key={question.questionId} elevation={1} square={false}>
                    <Provider store={store}>
                        <NewQuestion />
                    </Provider>
                </ConditionalSectionContainer>
            ))}
        </Container>
    );
};

export default FormQuestions;
