export interface IBanner {
backdrop_path : string
id : number
original_title : string
original_name : string
overview : string
release_date : Date
first_air_date : Date
}

export interface BannerResponse {
  page: number;
  results: IBanner[];
  total_pages: number;
  total_results: number;
}