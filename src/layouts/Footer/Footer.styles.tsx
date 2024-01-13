import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Div = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 20px 20px;
    background-color: #e7f1f1;
    @media (max-width: 768px) {
        flex-wrap: wrap;
        align-content: center;
        padding: 10px 20px;
    }
`;
export const FooterLink = styled(Link)`
    align-items: center;
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 999;
    color: gray;
    &:hover {
        color: blue;
        cursor: pointer;
    }
    text-decoration: none;
`;
