import { createSlice } from '@reduxjs/toolkit';

export const loadedPhotoSlice = createSlice({
    name: 'loadedPhoto',
    initialState: {
        loadedPhoto: null,
    },
    reducers: {
        setLoadedPhoto: (state, action) => {
            return {
                loadedPhoto: action.payload,
            };
        },
    },
});

export const {setLoadedPhoto} = loadedPhotoSlice.actions;
