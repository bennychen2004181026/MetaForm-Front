import React from 'react';

import styled from 'styled-components';

import { IQuestionTitle } from '@/interfaces/CreateForm';
import ImageContainer from '@/layouts/ImageContainer';

const StyledQuestionHeader = styled.p`
    font-size: 1.3em;
    font-family: 'Noto Sans', sans-serif;
`;
const QuestionTitle = ({ questionTitle }: { questionTitle: IQuestionTitle }) => {
    return (
        <>
            <StyledQuestionHeader>{questionTitle.content}</StyledQuestionHeader>
            {questionTitle.image && <ImageContainer large image={questionTitle.image} />}
        </>
    );
};

export default QuestionTitle;
