import React, { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IFectchedForm } from '@/interfaces/CreateResponse';

const StyledFooter = styled.div`
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    aligh-items: center;
`;
const StyledHeader = styled(CardHeader)`
    justify-content: center;
    min-height: 200px;
`;

const StyledTypographyForResponse = styled(Typography)`
    display: inline-block;
    font-size: 20px;
    margin: auto 0;
`;
// const cardActions = ['Share', 'Rename', 'Duplicate', 'Delete'];
const cardActions = [
    { name: 'Preview', link: '/newResponse' },
    { name: 'Rename', link: 'www.google.com' },
];

const FormCard = ({ form }: { form: IFectchedForm }) => {
    const { _id, title, responses } = form;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <Box>
            <Card variant="outlined">
                <StyledHeader title={title} />
                <Divider light />
                <StyledFooter>
                    <StyledTypographyForResponse variant="body1" color="text.secondary">
                        {`${responses!.length} Responses`}
                    </StyledTypographyForResponse>
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                </StyledFooter>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            {cardActions.map(({ name, link }) => (
                                <ListItem disablePadding key={name}>
                                    <ListItemButton>
                                        <Link to={`${link}/${_id}`}>
                                            <ListItemText primary={name} />
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Popover>
            </Card>
        </Box>
    );
};
export default FormCard;
