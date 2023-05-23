export interface IVacancy {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  profession: string;
  vacancyRichText: string;
  currency: string;
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
}

export interface IVacanciesResponse {
  more: boolean;
  objects: IVacancy[];
  subscription_active: boolean;
  subscription_id: number;
  total: number;
  corrected_keyword?: string;
}
