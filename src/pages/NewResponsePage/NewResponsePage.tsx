import React from 'react';

import FormHeader from './components/FormHeader';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import Question from '@/pages/NewResponsePage/components/Question';
import dummyQuestions from '@/pages/NewResponsePage/questions/DummyQuestions';
import GlobalStyle from '@/styles/GlobalStyle';

const NewResponsePage = () => {
    return (
        <div>
            <GlobalStyle />
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormHeader />
                <Question question={dummyQuestions[0]} />
                <Question question={dummyQuestions[1]} />
                <Question question={dummyQuestions[2]} />
                <Question question={dummyQuestions[4]} />
                <Question question={dummyQuestions[5]} />
                <Question question={dummyQuestions[6]} />
            </ConditionalSectionContainer>
        </div>
    );
};

export default NewResponsePage;
