import React from 'react';

import styled from 'styled-components';

import CustomTypography from '@/components/CustomTypography';
import LabelValuePair from '@/components/LabelValuePair';

const StyledStepperBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    flex-wrap: wrap;
    align-content: center;
    margin-top: 40px;
    width: 80vw;
    max-width: 700px;
    height: 70vh;
    max-height: 500px;
    @media (max-width: 768px) {
        flex-direction: column;
        flex-wrap: nowrap;
        margin-top: 6vh;
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
`;

const StyledEmployeeInfoBox = styled.div`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledLabelValuePair = styled(LabelValuePair)`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    align-items: center;
`;

interface StepContentThreeProps {
    fieldsData: Record<string, string>;
}

const labelMapping = {
    firstname: 'First Name',
    lastname: 'Last Name',
    username: 'User Name',
};

const StepContentThree: React.FC<StepContentThreeProps> = ({ fieldsData }) => {
    const fieldDataArray = Object.entries(fieldsData);
    const filteredFieldsData = fieldDataArray.filter(
        ([key]) => !['password', 'confirmPassword', 'token'].includes(key),
    );
    return (
        <StyledStepperBoxContainer>
            <TitleContainer>
                <CustomTypography variant="h5" text="Review your Company Profile" />
            </TitleContainer>
            <StyledEmployeeInfoBox>
                {filteredFieldsData?.map(([key, value]) => (
                    <StyledLabelValuePair
                        key={key}
                        label={labelMapping[key as keyof typeof labelMapping] || key}
                        value={value}
                    />
                ))}
            </StyledEmployeeInfoBox>
        </StyledStepperBoxContainer>
    );
};

export default StepContentThree;
