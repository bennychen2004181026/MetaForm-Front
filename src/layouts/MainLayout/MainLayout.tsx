import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
    min-height: 100%;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
    return <Container className={className}>{children}</Container>;
};

export default MainLayout;
