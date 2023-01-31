import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmReducer from './reducers/FilmSlice';
import genreReducer from './reducers/GenreSlice';

const rootReducer = combineReducers({
    filmReducer,
    genreReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];