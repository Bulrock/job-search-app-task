import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { IVacancy } from '@/types/vacancies';

import { ENDPOINT_VACANCY } from '@/constants/endpoints';
import { PUBLISHED, PER_PAGE } from '@/constants/queryParameters';

interface IVacanciesServiceProps {
  page: number;
  payment_from: string | number | '';
  payment_to: string | number | '';
  catalogues: string | '';
  keyword: string | '';
}

export default async function vacanciesService({
  page,
  payment_from,
  payment_to,
  catalogues,
  keyword,
}: IVacanciesServiceProps): Promise<IVacancy[]> {
  const encodedURI = keyword ? encodeURIComponent(keyword) : '';
  const pageIndex = page - 1;

  const response = await fetch(
    `${ENDPOINT_VACANCY}/?count=${PER_PAGE}&page=${pageIndex}&published=${PUBLISHED}&keyword=${encodedURI}&payment_from=${payment_from}&payment_to=${payment_to}&catalogues=${catalogues}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': X_SECRET_KEY,
        'X-Api-App-Id': CLIENT_SECRET,
        Authorization: `Bearer ${window.localStorage.getItem('access_token')?.slice(1, -1)}`,
      },
    }
  );

  if (response.status >= 500 && response.status <= 599) {
    throw new Error('500 Internal Server Error');
  }

  const responseJSON = await response.json();
  console.log(responseJSON);
  localStorage.setItem('total', JSON.stringify(Math.floor(responseJSON['total'] / 4)));

  return responseJSON['objects'];
}
