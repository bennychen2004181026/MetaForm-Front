import React from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material/';
import styled from 'styled-components';

interface ListIconAndTextItemProps {
    icon: React.ReactNode;
    primaryText: string;
    secondaryText: string;
}

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-around;
    min-width: 220px;
    margin: 0 0 20px 0;
    max-width: 500px;
`;

const StyledListItemText = styled(ListItemText)`
    max-width: 250px;
    & .MuiListItemText-primary {
        color: #1045cc;
    }

    & .MuiListItemText-secondary {
        color: #a69355;
    }
`;
const StyledListItemAvatar = styled(ListItemAvatar)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    flex-shrink: 0;
    width: 110px;
`;

const ListIconAndTextItem: React.FC<ListIconAndTextItemProps> = ({
    icon,
    primaryText,
    secondaryText,
}) => {
    return (
        <StyledListItem>
            <StyledListItemAvatar>
                <Avatar>{icon}</Avatar>
            </StyledListItemAvatar>
            <StyledListItemText primary={primaryText} secondary={secondaryText} />
        </StyledListItem>
    );
};

export default ListIconAndTextItem;
