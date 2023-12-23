import React from 'react';

import QuestionBody from './components/QuestionBody/QuestionBody';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const NewQuestion = () => {
    return (
        <div>
            <QuestionTitle />
            <QuestionBody />
            <BottomToolbar />
        </div>
    );
};
export default NewQuestion;
