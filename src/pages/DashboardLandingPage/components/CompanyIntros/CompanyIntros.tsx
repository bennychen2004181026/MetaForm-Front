import React from 'react';

import { Badge, Business, BusinessCenter } from '@mui/icons-material/';
import { List, ListItem, ListItemAvatar } from '@mui/material/';
import styled from 'styled-components';

import DefaultCompanyLogo from '@/assets/images/DefaultCompanyLogo.jpg';
import ListIconAndTextItem from '@/components/ListIconAndTextItem/';

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

const CompanyIntros: React.FC = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <StyledListItem>
                <ListItemAvatar>
                    <Logo src={DefaultCompanyLogo} alt="Default Company Logo" />
                </ListItemAvatar>
            </StyledListItem>
            <ListIconAndTextItem
                icon={<BusinessCenter />}
                primaryText="Company Name"
                secondaryText="123132"
            />
            <ListIconAndTextItem icon={<Badge />} primaryText="ABN" secondaryText="1231231" />
            <ListIconAndTextItem
                icon={<Business />}
                primaryText="Industry"
                secondaryText="123132"
            />
        </List>
    );
};

export default CompanyIntros;
