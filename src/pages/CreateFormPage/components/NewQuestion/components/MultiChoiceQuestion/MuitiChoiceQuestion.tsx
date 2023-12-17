import React from 'react';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionContainer from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionContainer';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = ({ isCheckbox = false }: { isCheckbox: boolean }) => {
    return (
        <GlobalState>
            <QuestionContainer>
                <QuestionTitle />
                <OptionList dense isCheckbox={isCheckbox} />
                <AddOption />
            </QuestionContainer>
        </GlobalState>
    );
};

export default MuitiChoiceQuestion;
