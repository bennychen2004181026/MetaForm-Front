import React from 'react';

import Typography from '@mui/material/Typography';
import styled from 'styled-components';

interface LabelValueProps {
    label: string;
    value: string;
    className?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px 0;
`;

const Label = styled(Typography).attrs({
    variant: 'subtitle1',
    gutterBottom: true,
})`
    font-weight: 500;
    color: #6b7280;
    word-break: break-word;
    white-space: normal;
`;

const Value = styled(Typography).attrs({
    variant: 'body1',
    gutterBottom: true,
})`
    font-size: 1rem;
    color: #111827;
    word-break: break-word;
    white-space: normal;
`;

const LabelValuePair: React.FC<LabelValueProps> = ({ label, value, className }) => {
    return (
        <Container className={className}>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Container>
    );
};

export default LabelValuePair;
