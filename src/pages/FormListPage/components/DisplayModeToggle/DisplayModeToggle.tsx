import React from 'react';

import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const DisplayModeToggle = ({
    displayMode,
    setDisplayMode,
}: {
    displayMode: string;
    setDisplayMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <ToggleButtonGroup value={displayMode} exclusive aria-label="Forms display mode">
            <ToggleButton value="list" aria-label="List" onClick={() => setDisplayMode('list')}>
                <DnsOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="cards" aria-label="Cards" onClick={() => setDisplayMode('cards')}>
                <AppsOutlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default DisplayModeToggle;
