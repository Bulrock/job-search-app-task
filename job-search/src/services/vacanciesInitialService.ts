import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { IVacancy } from '@/types/vacancies';

import { ENDPOINT_VACANCY } from '@/constants/endpoints';

export default async function vacanciesInitialService(page: number): Promise<IVacancy[]> {
  const response = await fetch(`${ENDPOINT_VACANCY}/?count=4&page=${page}`, {
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
  localStorage.setItem('total', JSON.stringify(Math.floor(responseJSON['total'] / 4)));

  return responseJSON['objects'];
}
