import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { IVacancy } from '@/types/vacancies';

import { ENDPOINT_VACANCY } from '@/constants/endpoints';

interface IVacancyDetailsServiceProps {
  id: number | null;
}

export default async function vacancyDetailsService({
  id,
}: IVacancyDetailsServiceProps): Promise<IVacancy> {
  const response = await fetch(`${ENDPOINT_VACANCY}/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-secret-key': X_SECRET_KEY,
      'X-Api-App-Id': CLIENT_SECRET,
      Authorization: `Bearer ${window.localStorage.getItem('access_token')?.slice(1, -1)}`,
    },
  });

  if (response.status >= 500 && response.status <= 599) {
    throw new Error('500 Internal Server Error');
  }

  const responseJSON = await response.json();
  console.log(responseJSON);

  return responseJSON;
}
