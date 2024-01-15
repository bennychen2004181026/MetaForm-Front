import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Div = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding: 10px 20px;
    background-color: #e7f1f1;
    @media (max-width: 768px) and (min-width: 600px) {
        flex-wrap: wrap;
        align-content: center;
        padding: 10px 16px;
    }
    @media (max-width: 599px) {
        padding: 10px 10px;
    }
`;
export const FooterLink = styled(Link)`
    align-items: center;
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 100;
    color: gray;
    &:hover {
        color: blue;
        cursor: pointer;
    }
    text-decoration: none;
`;
