import React from 'react';

import { Box } from '@mui/system';

import QuestionTitle from './components/QuestionTitle';
import QuestionTypeSelector from './components/QuestionTypeSelector';

const NewQuestion = () => {
    return (
        <Box>
            <div>
                <QuestionTypeSelector />
                <QuestionTitle />
            </div>
        </Box>
    );
};
export default NewQuestion;
