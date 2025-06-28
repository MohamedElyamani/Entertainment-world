// export interface ISimilar {
//     id: number;
//     original_title: string;
//     original_name: string;
//     poster_path: string;
//     backdrop_path: string;
//     vote_average: number;
// }
// export interface ISimilarResponse {
//     results: ISimilar[];
// }

export interface ISimilar {
    id: number;
    original_title?: string;
    original_name?: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
  }
  
  export interface ISimilarResponse {
    id: number;
    name: string;
    parts: ISimilar[]; // ✅ use 'parts' instead of 'results'
  }
  export interface ISimilarResponse {
    results: ISimilar[];
  }