import React, { ReactNode } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface ListItemLinkProps {
    icon: ReactNode;
    text: string;
    onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const AppBarDrawerListItem: React.FC<ListItemLinkProps> = ({ icon, text, onClick }) => {
    return (
        <ListItem onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};

export default AppBarDrawerListItem;
