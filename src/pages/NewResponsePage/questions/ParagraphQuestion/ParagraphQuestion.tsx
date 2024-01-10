import React from 'react';

import MultiLineTextField from '@/layouts/MultiLineTextField';

const ParagraphQuestion = ({ required }: { required: boolean }) => {
    return <MultiLineTextField multilines requiredQuestion={required} />;
};

export default ParagraphQuestion;
