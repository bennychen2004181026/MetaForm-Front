import React from 'react';

import MultiChoiceQuestion from '@/components/Questions/MultichoiceQuestion/MultichoiceQuestion';

const exampleQuestion = {
    title: 'Is Melbourne raining today?',
    choices: ["Yes, it's raining", 'No, I am roasting'],
    required: true,
};

const CreateFormPage = () => {
    const { title, choices, required } = exampleQuestion;
    return (
        <div>
            <MultiChoiceQuestion title={title} choices={choices} required={required} />
        </div>
    );
};
export default CreateFormPage;
