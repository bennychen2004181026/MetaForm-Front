import React from 'react';

import Typography from '@mui/material/Typography';
import styled from 'styled-components';

interface LabelValueProps {
    label: string;
    value: string;
}

const Label = styled(Typography).attrs({
    variant: 'subtitle1',
    gutterBottom: true,
})``;

const Value = styled(Typography).attrs({
    variant: 'body1',
    gutterBottom: true,
})``;

const LabelValuePair: React.FC<LabelValueProps> = ({ label, value }) => {
    return (
        <>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </>
    );
};

export default LabelValuePair;
