import { configureStore } from '@reduxjs/toolkit';
import { videogameReducer } from './reducer';

const store = configureStore({
    reducer: {
        videogames: videogameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
})

export default store