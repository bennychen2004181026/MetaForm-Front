import React from 'react';

import { Box, Typography } from '@mui/material';

interface StepContentThreeProps {
    fieldsData: Record<string, string>;
}

const StepContentThree: React.FC<StepContentThreeProps> = ({ fieldsData }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
            }}
        >
            <Box sx={{ flex: 1, mr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
                <Typography variant="h5" gutterBottom>
                    Review your Company Profile
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Company Name
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {fieldsData.companyName}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Industry
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {fieldsData.industry}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        ABN
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {fieldsData.abn}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    width: { xs: '80%', md: '50%' },
                    height: { xs: '180px', md: '300px' },
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: fieldsData.companyLogo ? 'transparent' : '#f0f0f0',
                }}
            >
                {fieldsData.companyLogo ? (
                    <img
                        src={fieldsData.companyLogo}
                        alt="Company Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                ) : (
                    <Typography variant="body1">No image uploaded</Typography>
                )}
            </Box>
        </Box>
    );
};

export default StepContentThree;
