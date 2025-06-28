export interface IMediaList {
    id: number;
    original_title: string;
    original_name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    media_type: 'movie' | 'tv';
}

export interface IMediaListResponse {
    page: number;
    results: IMediaList[];
    total_pages: number;
    total_results: number;
}