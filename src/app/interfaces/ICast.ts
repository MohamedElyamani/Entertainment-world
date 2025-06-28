export interface ICast {
    character: string;
    id: number;
    original_name: string;
    profile_path: string
}

export interface ICastResponse {
    cast: ICast[];
}