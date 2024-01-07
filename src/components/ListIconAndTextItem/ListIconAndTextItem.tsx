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
`;

const StyledListItemText = styled(ListItemText)`
    & .MuiListItemText-primary {
        color: #1045cc;
    }

    & .MuiListItemText-secondary {
        color: #a69355;
    }
`;

const ListIconAndTextItem: React.FC<ListIconAndTextItemProps> = ({
    icon,
    primaryText,
    secondaryText,
}) => {
    return (
        <StyledListItem>
            <ListItemAvatar>
                <Avatar>{icon}</Avatar>
            </ListItemAvatar>
            <StyledListItemText primary={primaryText} secondary={secondaryText} />
        </StyledListItem>
    );
};

export default ListIconAndTextItem;
