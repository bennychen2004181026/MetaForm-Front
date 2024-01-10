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
import formSlice from './slices/form/formSlice';
import userApis from '@/services/Auth/user';
import s3Apis from '@/services/S3';
import snackbarSlice from '@/store/slices/snackbar/snackbarSlice';
import { setGetTokenMethod } from '@/utils/tokenHandler';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    [userApis.reducerPath]: userApis.reducer,
    [s3Apis.reducerPath]: s3Apis.reducer,
    auth: authReducer,
    snackbar: snackbarSlice,
    forms: formSlice.reducer,
    formResponses: formSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(userApis.middleware)
            .concat(s3Apis.middleware),
});

type IRootState = ReturnType<typeof store.getState>;
setGetTokenMethod(() => store.getState().auth.token);
export const persistor = persistStore(store);
export default { store, persistor };
export type { IRootState };
export type AppDispatch = typeof store.dispatch;
