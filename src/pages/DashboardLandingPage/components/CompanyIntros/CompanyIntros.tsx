import React from 'react';

import { Badge, Business, BusinessCenter } from '@mui/icons-material/';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material/';
import styled from 'styled-components';

import DefaultCompanyLogo from '@/assets/images/DefaultCompanyLogo.jpg';

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-around;
    min-width: 220px;
    margin: 0 0 20px 0;
`;

const Logo = styled.img`
    height: 100px;
    width: 100px;
`;

const StyledListItemText = styled(ListItemText)`
    & .MuiListItemText-primary {
        color: #1045cc;
    }

    & .MuiListItemText-secondary {
        color: #a69355;
    }
`;

const CompanyIntros: React.FC = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <StyledListItem>
                <ListItemAvatar>
                    <Logo src={DefaultCompanyLogo} alt="Default Company Logo" />
                </ListItemAvatar>
            </StyledListItem>
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BusinessCenter />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="Company Name" secondary="123123" />
            </StyledListItem>
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Badge />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="ABN" secondary="1231231" />
            </StyledListItem>
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Business />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="Industry" secondary="1231231" />
            </StyledListItem>
        </List>
    );
};

export default CompanyIntros;
