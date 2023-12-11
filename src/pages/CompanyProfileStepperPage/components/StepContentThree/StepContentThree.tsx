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
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    gap: 2rem;
`;

const StyledLeftBox = styled.div`
    flex: 1;
    margin-right: 8px;
    margin-bottom: 8px;
`;

const StyledCompanyInfoBox = styled.div`
    flex: 1;
    background-color: #f0f0f0;
    padding: 16px;
    border: 1px solid #ddd;
`;

const StyledRightBox = styled.div.attrs<{ hasCompanyLogo: boolean }>((props) => ({
    hasCompanyLogo: props.hasCompanyLogo,
}))`
    flex: 1;
    width: 80%;
    height: 180px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.hasCompanyLogo ? 'transparent' : '#f0f0f0')};
    max-width: 100%;
    max-height: 100%;
`;
interface StepContentThreeProps {
    fieldsData: Record<string, string>;
}

const StepContentThree: React.FC<StepContentThreeProps> = ({ fieldsData }) => {
    return (
        <StyledStepperBoxContainer>
            <StyledLeftBox>
                <CustomTypography variant="h5" text="Review your Company Profile" />
            </StyledLeftBox>
            <StyledCompanyInfoBox>
                <LabelValuePair label="Company Name" value={fieldsData.companyName} />
                <LabelValuePair label="Industry" value={fieldsData.industry} />
                <LabelValuePair label="ABN" value={fieldsData.abn} />
            </StyledCompanyInfoBox>
            <StyledRightBox hasCompanyLogo={Boolean(fieldsData.companyLogo)}>
                {fieldsData.companyLogo ? (
                    <img
                        src={fieldsData.companyLogo}
                        alt="Company Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                ) : (
                    <CustomTypography variant="body1" text="No image uploaded" />
                )}
            </StyledRightBox>
        </StyledStepperBoxContainer>
    );
};

export default StepContentThree;
