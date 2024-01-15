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

const InfoAndLogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        align-items: center;
        padding: 20px 0;
    }
`;

const StyledCompanyInfoBox = styled.div`
    flex: 1;
    background-color: #f0f0f0;
    padding: 8px;
    border: 1px solid #ddd;
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 768px) and (min-width: 600px) {
        flex-direction: row;
        justify-content: space-around;
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        height: fit-content;
        align-content: center;
        align-items: flex-start;
    }
    @media (max-width: 599px) {
        flex-direction: row;
        justify-content: space-around;
        width: 80vw;
        display: flex;
        flex-wrap: nowrap;
        height: fit-content;
        align-content: center;
        align-items: flex-start;
    }
`;

const StyledLabelValuePair = styled(LabelValuePair)`
    width: 120px;
    @media (max-width: 768px) {
        width: 100px;
    }
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
    height: 40vh;
    padding: 8px;
    flex-direction: row;
    flex-wrap: wrap;
    @media (max-width: 768px) and (min-width: 600px) {
        height: 60vh;
        width: 72vw;
        min-width: 230px;
        min-height: 280px;
    }
    @media (max-width: 599px) {
        height: 60vh;
        width: 80vw;
        min-width: 230px;
        min-height: 280px;
    }
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
                    <StyledLabelValuePair label="Company Name" value={fieldsData.companyName} />
                    <StyledLabelValuePair label="Industry" value={fieldsData.industry} />
                    <StyledLabelValuePair label="ABN" value={fieldsData.abn} />
                </StyledCompanyInfoBox>
                <StyledLogoBox hasCompanyLogo={Boolean(fieldsData.logo)}>
                    {fieldsData.logo ? (
                        <img
                            src={fieldsData.logo}
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
