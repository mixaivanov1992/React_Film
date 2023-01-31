import { FilmState } from "src/assets/models/Film"
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createFilm, deleteFilm, fetchFilm, updateFilm } from "src/store/actions/FilmAction";

interface InitialState {
    films: FilmState,
    isLoading: boolean,
    message: string,
}

const initialState: InitialState = {
    films: {
        0: {
            title: '',
            year: '',
            tags: []
        }
    },
    isLoading: false,
    message: ''
}

export const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {
        clearMessage(state){
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilm.fulfilled, (state, action: PayloadAction<FilmState>) => {
            state.isLoading = false;
            state.message = '';
            state.films = action.payload;
        })
        builder.addCase(createFilm.fulfilled, (state, action: PayloadAction<FilmState>) => {
            state.isLoading = false;
            state.message = 'Данные успешно добавлены';
            Object.assign(state.films, action.payload);
        })
        builder.addCase(updateFilm.fulfilled, (state, action: PayloadAction<FilmState>) => {
            state.isLoading = false;
            state.message = 'Данные успешно обновлены';
            Object.assign(state.films, action.payload);
        })
        builder.addCase(deleteFilm.fulfilled, (state, action: PayloadAction<number>) => {
            state.isLoading = false;
            state.message = 'Данные успешно удалены';
            delete state.films[action.payload];
        })
        builder.addMatcher(isAnyOf(fetchFilm.pending, createFilm.pending, updateFilm.pending, deleteFilm.pending), (state) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(fetchFilm.rejected, createFilm.rejected, updateFilm.rejected, deleteFilm.rejected), (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.message = action.payload;
        })
    },
});

export default filmSlice.reducer;