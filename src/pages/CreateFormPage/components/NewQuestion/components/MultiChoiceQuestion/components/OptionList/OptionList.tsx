import React from 'react';

import List from '@mui/material/List';

import Option from '../Option';

const fakeOptions = [1, 2, 3];

const OptionList = ({ dense }: { dense: boolean }) => {
    return (
        <List dense={dense}>
            {fakeOptions.map((item, _) => (
                <Option key={item} />
            ))}
        </List>
    );
};

export default OptionList;
