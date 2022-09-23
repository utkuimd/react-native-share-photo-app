import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { lastPhotoIDSlice } from './slices/lastPhotoID';
import { loadedPhotoSlice } from './slices/loadedPhoto';
import { themeSlice } from './slices/themeSlice';

export const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer,
        lastPhotoID: lastPhotoIDSlice.reducer,
        loadedPhoto: loadedPhotoSlice.reducer,
        theme: themeSlice.reducer,
    }),
});