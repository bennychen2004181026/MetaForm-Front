import React from 'react';

import styled from 'styled-components';

import AppRoute from '@/routes/AppRoute';

const App = () => {
    const CUSTOM_BLUE = '#4285f4';
    const Container = styled.div`
        align-items: center;
        background: ${CUSTOM_BLUE};
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
