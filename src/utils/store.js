import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer,
    }),
});