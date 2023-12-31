import React from 'react';

import QuestionBody from './components/QuestionBody/QuestionBody';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';
import GlobalStyle from '@/styles/GlobalStyle';

const NewQuestion = () => {
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
