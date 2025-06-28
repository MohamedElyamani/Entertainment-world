export interface IDetailsResponse {
    genres: {
        id: number;
        name: string;
    }[];
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    id: number;
    original_title: string;
    original_name: string;
    overview: string;
    poster_path: string;
    release_date: Date;
    first_air_date: Date;
    status: string;
    title: string;
    runtime: number;
    vote_average: number;
}