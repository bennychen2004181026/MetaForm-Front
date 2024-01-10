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
import companyReducer from './slices/company/companySlice';
import formSlice from './slices/form/formSlice';
import userApis from '@/services/Auth/user';
import companyApis from '@/services/company';
import s3Apis from '@/services/S3';
import snackbarSlice from '@/store/slices/snackbar/snackbarSlice';
import { setGetTokenMethod } from '@/utils/tokenHandler';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['auth', 'company'],
};

const rootReducer = combineReducers({
    [userApis.reducerPath]: userApis.reducer,
    [s3Apis.reducerPath]: s3Apis.reducer,
    [companyApis.reducerPath]: companyApis.reducer,
    auth: authReducer,
    company: companyReducer,
    snackbar: snackbarSlice,
    forms: formSlice.reducer,
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
            .concat(s3Apis.middleware)
            .concat(companyApis.middleware),
});
type IRootState = ReturnType<typeof store.getState>;
setGetTokenMethod(() => store.getState().auth.token);
export const persistor = persistStore(store);
export default { store, persistor };
export type { IRootState };
export type AppDispatch = typeof store.dispatch;
