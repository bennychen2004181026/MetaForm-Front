import React from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    max-width: 500px;
    margin: auto;
    margin-top: 20px;
`;

const UserProfileMain: React.FC = () => {
    const firstName = 'aaa';
    const username = 'bbb';

    return (
        <StyledCard>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">User Profile</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">First Name: {firstName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Username: {username}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
};

export default UserProfileMain;
