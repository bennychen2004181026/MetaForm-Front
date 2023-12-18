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

const InfoAndLogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
    }
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

const StyledLogoBox = styled.div.attrs<{ hasCompanyLogo: boolean }>((props) => ({
    hasCompanyLogo: props.hasCompanyLogo,
}))`
    border: 1px solid black;
    display: flex;
    flex: 2;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.hasCompanyLogo ? 'transparent' : '#f0f0f0')};
    max-width: 100%;
    max-height: 99%;
    @media (min-width: 600px) {
        width: 400px;
        height: 300px;
    }
    @media (min-width: 960px) {
        width: 60%;
        height: 400px;
    }
    flex-direction: row;
    flex-wrap: wrap;
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
            <InfoAndLogoContainer>
                <StyledCompanyInfoBox>
                    <LabelValuePair label="Company Name" value={fieldsData.companyName} />
                    <LabelValuePair label="Industry" value={fieldsData.industry} />
                    <LabelValuePair label="ABN" value={fieldsData.abn} />
                </StyledCompanyInfoBox>
                <StyledLogoBox hasCompanyLogo={Boolean(fieldsData.companyLogo)}>
                    {fieldsData.companyLogo ? (
                        <img
                            src={fieldsData.companyLogo}
                            alt="Company Logo"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    ) : (
                        <CustomTypography variant="body1" text="No image uploaded" />
                    )}
                </StyledLogoBox>
            </InfoAndLogoContainer>
        </StyledStepperBoxContainer>
    );
};

export default StepContentThree;
