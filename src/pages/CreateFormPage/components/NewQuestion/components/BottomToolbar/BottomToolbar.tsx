import React from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Divider, FormControlLabel, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';

const BottomToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const BottomToolbar = () => {
    return (
        <BottomToolbarContainer>
            <IconButton>
                <ContentCopyIcon />
            </IconButton>
            <IconButton>
                <DeleteForeverIcon />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '0 30px' }} />
            <FormControlLabel required control={<Switch />} label="Required" />
        </BottomToolbarContainer>
    );
};

export default BottomToolbar;
