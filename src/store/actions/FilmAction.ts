import axios from "axios";
import { CreateFilmResponse, DeleteFilmResponse, FetchFilmResponse, UpdateFilmResponse } from "src/assets/models/Film";
import $api, { API_URL } from "src/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilm = createAsyncThunk(
    'film/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get<FetchFilmResponse>(`${API_URL}/films`);
            if(data.success){
                return data.films;
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

export const createFilm = createAsyncThunk(
    'film/create',
    async (params: {title: string, year: string, tags: Array<number>}, { rejectWithValue }) => {
        try {
            const { data } = await $api.post<CreateFilmResponse>('/films', { params });
            if(data.success){
                return {[data.id]: params};
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

export const updateFilm = createAsyncThunk(
    'film/update',
    async (params: {id: number, title: string, year: string, tags: Array<number>}, { rejectWithValue }) => {
        const {id, title, year, tags} = params;
        try {
            const { data } = await $api.put<UpdateFilmResponse>(`/films/${id}`, {title, year, tags});
            if(data.success){
                return {[id]: { title, year, tags }};
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

export const deleteFilm = createAsyncThunk(
    'film/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete<DeleteFilmResponse>(`/films/${id}`);
            if(data.success){
                return id;
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