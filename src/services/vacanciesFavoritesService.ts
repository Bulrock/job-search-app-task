import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { IVacancy } from '@/types/vacancies';

import { ENDPOINT_VACANCY } from '@/constants/endpoints';
import { PER_PAGE } from '@/constants/queryParameters';

export default async function vacancyFavoritesService(page: number): Promise<IVacancy[]> {
  const favoritesIdArray = localStorage.getItem('favorites');
  const pageIndex = page - 1;

  if (favoritesIdArray?.length === 0) {
    return [];
  } else {
    const idArray = JSON.parse(favoritesIdArray || '[]');
    const params = `ids[]=${idArray.join('&ids[]=')}`;

    const response = await fetch(
      `${ENDPOINT_VACANCY}/?count=${PER_PAGE}&page=${pageIndex}&${params}`,
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

    return responseJSON['objects'];
  }
}
