import React from 'react';

import QuestionBody from './components/QuestionBody/QuestionBody';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const NewQuestion = () => {
    return (
        <GlobalState>
            <div>
                <QuestionTitle />
                <QuestionBody />
                <BottomToolbar />
            </div>
        </GlobalState>
    );
};
export default NewQuestion;
