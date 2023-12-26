import React from 'react';

import styled from 'styled-components';

import QuestionBody from './components/QuestionBody/QuestionBody';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const NewQuestion = () => {
    return (
        <div>
            <QuestionTitle />
            <QuestionBody />
        </div>
    );
};
export default NewQuestion;
