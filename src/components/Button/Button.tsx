import { Button } from '@mui/material';
import styled from 'styled-components';

interface CustomButtonProps {
    styleProps?: React.CSSProperties;
}

const StyledButton = styled(Button)<CustomButtonProps>`
    && {
        ${(props) => ({ ...props.styleProps })}
    }
`;

export default StyledButton;
