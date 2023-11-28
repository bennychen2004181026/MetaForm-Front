import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    padding: 10px 20px;
`;
export const Image = styled.img`
    height: auto;
    width: 200px;
`;
export const SignUpLink = styled.p`
    font-size: 14px;
`;
export const StyledLink = styled(Link)`
    color: black;
    font-weight: bold;
    margin-left: 10px;
    text-decoration: none;
`;
