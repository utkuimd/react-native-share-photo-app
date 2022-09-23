import { createSlice } from '@reduxjs/toolkit';
import darkTheme from '../../constants/dark';
import lightTheme from '../../constants/light';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
      theme: lightTheme,
    },
    reducers: {
      toggleTheme: state => {
        return {
          theme: state.theme.type === 'light' ? darkTheme : lightTheme,
        };
      },
    },
});

export const {toggleTheme} = themeSlice.actions;
