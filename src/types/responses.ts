export interface IPositions {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export interface ICatalogue {
  key: number;
  positions: IPositions[];
  title: string;
  title_rus: string;
  title_trimmed: string;
  url_rus: string;
}

export type ICataloguesResponse = ICatalogue[];
