import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import styled from 'styled-components';

import CustomTypography from '@/components/CustomTypography';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

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
    }
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    gap: 2rem;
`;

const StyledImageContainer = styled.div`
    border: 2px dashed grey;
    width: 300px;
    height: 200px;
    @media (min-width: 600px) {
        width: 400px;
        height: 300px;
    }
    @media (min-width: 960px) {
        width: 500px;
        height: 400px;
    }
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const StyledImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
interface StepContentTwoProps {
    fieldsData: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
}

const StepContentTwo: React.FC<StepContentTwoProps> = ({ fieldsData, onDataChange }) => {
    const showSnackbar = useSnackbarHelper();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            showSnackbar('You had successfully upload logo', 'info');
        }
    };

    return (
        <StyledStepperBoxContainer>
            <StyledImageContainer>
                {fieldsData.companyLogo ? (
                    <StyledImage src={fieldsData.companyLogo} alt="Uploaded Logo" />
                ) : (
                    <CustomTypography
                        variant="body1"
                        text="(Optional) Drag and drop an image here, or click to select a file"
                    />
                )}
            </StyledImageContainer>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        </StyledStepperBoxContainer>
    );
};

export default StepContentTwo;
