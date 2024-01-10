import React from 'react';

import MultiLineTextField from '@/layouts/MultiLineTextField';

const ShortAnswerQuestion = ({ required }: { required: boolean }) => {
    return <MultiLineTextField multilines={false} requiredQuestion={required} />;
};

export default ShortAnswerQuestion;
