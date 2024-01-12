import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
    width: 180px;
    transition:
        box-shadow 0.3s ease-in-out,
        transform 0.3s ease-in-out;
    animation: ${fadeIn} 0.5s ease-in;

    &:hover {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        display: none;
    }
`;
export const SignUpLink = styled.p`
    font-size: 14px;
    text-align: end;
`;
export const StyledLink = styled(Link)`
    color: black;
    font-weight: bold;
    margin-left: 10px;
    text-decoration: none;
`;
