export type FilmState = {
    [id: number]: {
        title: string,
        year: string,
        tags: Array<number>
    }
};

export interface FetchFilmResponse extends UpdateFilmResponse{
    films: FilmState
}

export type UpdateFilmResponse = {
    success: boolean,
    message: string
};

export interface DeleteFilmResponse  extends UpdateFilmResponse {};

export interface CreateFilmResponse extends UpdateFilmResponse {
    id: number
};