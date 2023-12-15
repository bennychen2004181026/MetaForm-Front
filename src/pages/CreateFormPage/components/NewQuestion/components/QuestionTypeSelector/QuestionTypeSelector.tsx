import React from 'react';

import { questionTypes } from '@/pages/CreateFormPage/components/CreateForm/questionTypes';
import GeneralSelector from '@/pages/CreateFormPage/components/NewQuestion/components/GeneralSelector';

const QuestionTypeSelector = () => {
    return <GeneralSelector options={questionTypes} minWidth="180px" />;
};

export default QuestionTypeSelector;
