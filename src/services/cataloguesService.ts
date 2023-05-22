import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { ENDPOINT_CATALOGUES } from '@/constants/endpoints';
import { ICataloguesResponse } from '@/types/responses';

export default async function cataloguesService(): Promise<ICataloguesResponse> {
  const response = await fetch(ENDPOINT_CATALOGUES, {
    method: 'POST',
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

  return responseJSON;
}
