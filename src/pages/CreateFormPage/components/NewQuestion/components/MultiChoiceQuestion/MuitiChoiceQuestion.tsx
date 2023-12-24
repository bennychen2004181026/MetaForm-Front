import React from 'react';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';

const MuitiChoiceQuestion = ({ isCheckbox = false }: { isCheckbox: boolean }) => {
    return (
        <div>
            <OptionList dense isCheckbox={isCheckbox} />
            <AddOption />
        </div>
    );
};

export default MuitiChoiceQuestion;
