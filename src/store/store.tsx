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
import formCardsSlice from './slices/formCards/formCardsSlice';
import userApis from '@/services/Auth/user';
import snackbarSlice from '@/store/slices/snackbar/snackbarSlice';
import { setGetTokenMethod } from '@/utils/tokenHandler';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    [userApis.reducerPath]: userApis.reducer,
    auth: authReducer,
    snackbar: snackbarSlice,
    formCards: formCardsSlice,
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
type IRootState = ReturnType<typeof store.getState>;
setGetTokenMethod(() => store.getState().auth.token);
export const persistor = persistStore(store);
export default { store, persistor };
export type { IRootState };
