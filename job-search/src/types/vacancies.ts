export interface IVacancy {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: string;
  payment: string;
  profession: string;
  work: string;
  metro: [
    {
      id: number;
      title: string;
      id_metro_line: number;
    },
    {
      id: number;
      title: string;
      id_metro_line: number;
    },
    {
      id: number;
      title: string;
      id_metro_line: number;
    }
  ];
  currency: string;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
  education: {
    id: number;
    title: string;
  };
  experience: {
    id: number;
    title: string;
  };
  maritalstatus: {
    id: number;
    title: string;
  };
  children: {
    id: number;
    title: string;
  };
  already_sent_on_vacancy: boolean;
  languages: string[];
  driving_licence: string[];
  catalogues: [
    {
      id: number;
      title: string;
      positions: [
        {
          id: number;
          title: string;
        }
      ];
    }
  ];
  agency: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: {
    id: number;
    title: string;
  };
  firm_name: string;
  firm_activity: string;
  link: string;
}

export interface IVacanciesResponse {
  more: boolean;
  objects: IVacancy[];
  subscription_active: boolean;
  subscription_id: number;
  total: number;
  corrected_keyword?: string;
}
