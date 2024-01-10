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
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    aligh-items: center;
`;
interface FormCardProps {
    formTitle: string;
    numOfResponses: number;
}
const StyledHeader = styled(CardHeader)`
    justify-content: center;
    min-height: 200px;
`;
const StyledCardContainer = styled(Box)`
    max-width: 400px;
    min-width: 300px;
`;
const StyledTypographyForResponse = styled(Typography)`
    display: inline-block;
    font-size: 20px;
    margin: auto 0;
`;
const cardActions = ['Share', 'Rename', 'Duplicate', 'Delete'];
const FormCard = ({ formTitle, numOfResponses }: FormCardProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <StyledCardContainer>
            <Card variant="outlined">
                <StyledHeader title={formTitle} />
                <Divider light />
                <StyledFooter>
                    <StyledTypographyForResponse variant="body1" color="text.secondary">
                        {`${numOfResponses} Responses`}
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
                            {cardActions.map((action) => (
                                <ListItem disablePadding key={action}>
                                    <ListItemButton>
                                        <ListItemText primary={action} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Popover>
            </Card>
        </StyledCardContainer>
    );
};
export default FormCard;
