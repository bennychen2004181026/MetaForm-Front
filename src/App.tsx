import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';

import Snackbar from '@/components/SnackBar/index';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import AppRoute from '@/routes/AppRoute';
import { persistor, store } from '@/store/store';

const App = () => {
    const Container = styled.div`
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 0 20px;
        @media (max-width: 600px) {
            padding: 0;
        }
    `;
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
                    <Container>
                        <AppRoute />
                    </Container>
                </PersistGate>
                <Snackbar />
            </SnackbarProvider>
        </Provider>
    );
};

export default App;
