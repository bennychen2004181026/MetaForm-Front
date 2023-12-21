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

const StyledCompanyInfoBox = styled.div`
    flex: 1;
    background-color: #f0f0f0;
    padding: 8px;
    border: 1px solid #ddd;
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

interface StepContentThreeProps {
    fieldsData: Record<string, string>;
}

const StepContentThree: React.FC<StepContentThreeProps> = ({ fieldsData }) => {
    return (
        <StyledStepperBoxContainer>
            <TitleContainer>
                <CustomTypography variant="h5" text="Review your Company Profile" />
            </TitleContainer>
            <StyledCompanyInfoBox>
                <LabelValuePair label="First Name" value={fieldsData.firstName} />
                <LabelValuePair label="Last Name" value={fieldsData.lastName} />
                <LabelValuePair label="User name" value={fieldsData.username} />
            </StyledCompanyInfoBox>
        </StyledStepperBoxContainer>
    );
};

export default StepContentThree;
