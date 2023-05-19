import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';

import { ENDPOINT_FAVOURITES } from '@/constants/endpoints';

export default async function favouritesService(method: boolean, id: number) {
  const response = await fetch(`${ENDPOINT_FAVOURITES}/${id}`, {
    method: `${method ? 'POST' : 'DELETE'}`,
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
