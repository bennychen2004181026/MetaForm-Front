import React from 'react';

import styled from 'styled-components';

import CustomTypography from '@/components/CustomTypography';
import LabelValuePair from '@/components/LabelValuePair';

const StyledStepperBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    width: 360px;
    height: 260px;
    @media (min-width: 600px) {
        width: 500px;
        height: 400px;
    }
    @media (min-width: 960px) {
        width: 600px;
        height: 500px;
        flex-direction: column;
    }
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1px;
    gap: 1rem;
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
    height: 95%;
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
