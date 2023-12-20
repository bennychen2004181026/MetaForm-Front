import React from 'react';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionContainer from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionContainer';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = () => {
    return (
        <GlobalState>
            <QuestionContainer>
                <QuestionTitle />
                <OptionList dense />
                <AddOption />
            </QuestionContainer>
        </GlobalState>
    );
};

export default MuitiChoiceQuestion;
