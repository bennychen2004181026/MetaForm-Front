import React, { useContext } from 'react';

import { List } from '@mui/material';

import Option from '../Option';

import { MuitichoiceContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const OptionList = ({ dense }: { dense: boolean }) => {
    const { state } = useContext(MuitichoiceContext);
    const { options } = state;
    return (
        <List dense={dense}>
            {options.map((option) => (
                <Option key={option.id} option={option} />
            ))}
        </List>
    );
};

export default OptionList;
