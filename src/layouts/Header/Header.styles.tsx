import styled from 'styled-components';

export const Nav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    #nav-items {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin: 10px auto;
        width: 90%;
    }
    .login {
        color: black;
        font-weight: bold;
        margin-left: 10px;
    }
`;
export const Image = styled.img`
    height: auto;
    width: 200px;
`;
export const SignUpLink = styled.p`
    font-size: 14px;
`;
