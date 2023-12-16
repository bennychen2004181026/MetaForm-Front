import React from 'react';

import { Box } from '@mui/material';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = () => {
    return (
        <GlobalState>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <QuestionTitle />
                <OptionList dense />
                <AddOption />
            </Box>
        </GlobalState>
    );
};

export default MuitiChoiceQuestion;
