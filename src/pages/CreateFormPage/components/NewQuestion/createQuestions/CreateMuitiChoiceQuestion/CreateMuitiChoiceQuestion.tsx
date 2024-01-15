import React from 'react';

import styled from 'styled-components';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';

const StyledMultichoice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const StyledAddOptionButtonGroup = styled.div`
    padding-left: 45px;
`;
const CreateMuitiChoiceQuestion = ({ isCheckbox = false }: { isCheckbox: boolean }) => {
    return (
        <StyledMultichoice>
            <OptionList isCheckbox={isCheckbox} />
            <StyledAddOptionButtonGroup>
                <AddOption />
            </StyledAddOptionButtonGroup>
        </StyledMultichoice>
    );
};

export default CreateMuitiChoiceQuestion;
