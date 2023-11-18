import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import Snackbar from './components/SnackBar/index';
import store from './store/index';
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
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <Container>
                    <AppRoute />
                </Container>
                <Snackbar />
            </SnackbarProvider>
        </Provider>
    );
};

export default App;
