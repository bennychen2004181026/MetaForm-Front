import React from 'react';

import styled from 'styled-components';

import AppRoute from '@/routes/AppRoute';

const App = () => {
    const Container = styled.div`
        align-items: center;
        background: white;
        display: flex;
        height: 100vh;
        justify-content: center;
        padding: 20px;
    `;
    return (
        <Container>
            <AppRoute />
        </Container>
    );
};

export default App;
