import React, { useContext } from 'react';

import { List } from '@mui/material';

import Option from '../Option';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const OptionList = ({ dense, isCheckbox }: { dense: boolean; isCheckbox: boolean }) => {
    const { state } = useContext(NewQuestionContext);
    const { options } = state;
    return (
        <List dense={dense}>
            {options.map((option) => (
                <Option key={option.id} option={option} checkbox={isCheckbox} />
            ))}
        </List>
    );
};

export default OptionList;
