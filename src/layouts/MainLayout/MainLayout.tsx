import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    margin: 80px auto;
    max-width: 1200px;
    width: 100%;
    min-height: 100%;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px) {
        padding: 10px;
        margin: 80px 0;
    }
    @media (max-width: 768px) {
        padding: 10px;
        margin: 80px 0;
    }
`;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default MainLayout;
