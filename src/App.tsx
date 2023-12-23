import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import Snackbar from '@/components/SnackBar/index';
import AppRoute from '@/routes/AppRoute';
import store from '@/store';

const App = () => {
    const Container = styled.div`
        align-items: center;
        display: flex;
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
