import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localForage from 'localforage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import authReducer from './slices/auth/authSlice';
import userApis from '@/services/Auth/user';
import snackbarSlice from '@/store/slices/snackbar/snackbarSlice';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    [userApis.reducerPath]: userApis.reducer,
    auth: authReducer,
    snackbar: snackbarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userApis.middleware),
});

export const persistor = persistStore(store);
export default { store, persistor };
