import axios from "axios";
import $api, { API_URL } from "src/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateGenreResponse, CreateGenreResponse, FetchGenreResponse } from "src/assets/models/Genre";


export const fetchGenre = createAsyncThunk(
    'genre/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<FetchGenreResponse>(`${API_URL}/tags`);
            if(data.success){
                return data.genres;
            }
            throw new Error(data.message);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

export const createGenre = createAsyncThunk(
    'genre/create',
    async (title: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.post<CreateGenreResponse>('/tags', { title });
            if(data.success){
                return [{id: data.id, title}];
            }
            throw new Error(data.message);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

export const updateGenre = createAsyncThunk(
    'genre/update',
    async (params: { id: number, title: string }, { rejectWithValue }) => {
        const {id, title} = params;
        try {
            const { data } = await $api.put<UpdateGenreResponse>(`/tags/${id}`, title);
            if(data.success){
                return [params];
            }
            throw new Error(data.message);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);