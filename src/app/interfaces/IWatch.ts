export interface IWatch {
  key: string;
  name: string;
  type: string;
}

export interface IWatchResponse {
  results: IWatch[];
}