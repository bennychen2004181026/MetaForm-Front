import React from 'react';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = ({ isCheckbox = false }: { isCheckbox: boolean }) => {
    return (
        <GlobalState>
            <QuestionTitle />
            <OptionList dense isCheckbox={isCheckbox} />
            <AddOption />
        </GlobalState>
    );
};

export default MuitiChoiceQuestion;
