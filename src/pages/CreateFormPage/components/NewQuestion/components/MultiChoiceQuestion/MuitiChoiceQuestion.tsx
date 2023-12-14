import React from 'react';

import { Box } from '@mui/system';

import Option from './QuestionOption/Option';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';

const MuitiChoiceQuestion = () => {
    return (
        <Box>
            <div>
                <QuestionTypeSelector />
                <QuestionTitle />
                <Option />
                <Option />
                <Option />
            </div>
        </Box>
    );
};

export default MuitiChoiceQuestion;
