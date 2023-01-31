export type GenreState = Array<{
    id: number,
    title: string,
}>;

export type UpdateGenreResponse = {
    success: boolean,
    message: string
};

export interface FetchGenreResponse extends UpdateGenreResponse{
    genres: GenreState
}

export interface CreateGenreResponse extends UpdateGenreResponse {
    id: number
};