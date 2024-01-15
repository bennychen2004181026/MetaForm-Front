import React from 'react';

import parse from 'html-react-parser';
import styled from 'styled-components';

import { IQuestionTitle } from '@/interfaces/CreateForm';
import ImageContainer from '@/layouts/ImageContainer';

const StyledQuestionHeader = styled.div`
    font-size: 1.3em;
    font-family: 'Noto Sans', sans-serif;
`;
const QuestionTitle = ({ questionTitle }: { questionTitle: IQuestionTitle }) => {
    const reactElement = parse(questionTitle.content);

    return (
        <>
            <StyledQuestionHeader>{reactElement}</StyledQuestionHeader>
            {questionTitle.image && <ImageContainer large image={questionTitle.image} />}
        </>
    );
};

export default QuestionTitle;
