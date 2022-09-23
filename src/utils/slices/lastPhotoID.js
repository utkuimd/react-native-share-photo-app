import { createSlice } from '@reduxjs/toolkit';

export const lastPhotoIDSlice = createSlice({
    name: 'lastPhotoID',
    initialState: {
        lastPhotoID: 0,
    },
    reducers: {
        setLastPhotoID: (state, action) => {
            return {
                lastPhotoID: action.payload,
            };
        },
    },
});

export const {setLastPhotoID} = lastPhotoIDSlice.actions;
