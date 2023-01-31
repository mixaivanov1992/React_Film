import { GenreState } from "src/assets/models/Genre"
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { fetchGenre, createGenre, updateGenre } from "src/store/actions/GenreAction";

interface InitialState {
    genres: GenreState,
    isLoading: boolean,
    message: string,
}

const initialState: InitialState = {
    genres: [
        {id: 0, title: ''}
    ],
    isLoading: false,
    message: ''
}

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        clearMessage(state){
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenre.fulfilled, (state, action: PayloadAction<GenreState>) => {
            state.isLoading = false;
            state.message = '';
            state.genres = action.payload;
        })
        builder.addCase(createGenre.fulfilled, (state, action: PayloadAction<GenreState>) => {
            state.isLoading = false;
            state.message = 'Данные успешно добавлены';
            state.genres.push(...action.payload);
        })
        builder.addCase(updateGenre.fulfilled, (state, action: PayloadAction<GenreState>) => {
            state.isLoading = false;
            state.message = 'Данные успешно обновлены';
            state.genres.push(...action.payload);
        })
        builder.addMatcher(isAnyOf(fetchGenre.pending, createGenre.pending, updateGenre.pending), (state) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(createGenre.rejected, updateGenre.rejected, fetchGenre.rejected), (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.message = action.payload;
        })
    },
});

export default genreSlice.reducer;