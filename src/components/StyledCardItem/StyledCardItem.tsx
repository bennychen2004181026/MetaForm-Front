import React from 'react';

import { Box, Card, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import styled from 'styled-components';

const CardItem = styled(Card)<{ color?: string }>`
    padding: 24px;
    width: 20vw;
    border-radius: 16px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${(props) => props.color || '#caf2fa'};
    width: 75vw;
    padding: 20px 2px;
    margin: 10px 0;
    max-width: 600px;
`;

const IconContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 30px;
    @media (max-width: 600px) {
        margin: 10px;
    }
`;

const TextBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 16px;
    width: 100%;
    @media (max-width: 600px) {
        margin-right: 10px;
    }
`;

const InfoText = styled(Typography)`
    font-weight: bold;
    font-size: 1.2rem;
    word-wrap: break-word;
    width: 22vw;
    max-width: 80px;
`;

const ValueText = styled(Typography)`
    padding: 0 20px;
    font-size: 1.2rem;
    word-wrap: break-word;
    @media (max-width: 600px) {
        width: 36vw;
        padding: 0;
    }
`;

interface CardItemBoxProps {
    icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName?: string };
    info: string;
    value: string;
    color?: string;
}

const StyledCardItem: React.FC<CardItemBoxProps> = ({ icon: Icon, info, value, color }) => {
    return (
        <CardItem color={color}>
            <IconContainer>
                <Icon color="secondary" />
            </IconContainer>
            <TextBox>
                <InfoText>{info}</InfoText>
                <ValueText>{value}</ValueText>
            </TextBox>
        </CardItem>
    );
};

export default StyledCardItem;
