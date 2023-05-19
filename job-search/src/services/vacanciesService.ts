import { X_SECRET_KEY, CLIENT_SECRET } from '@/constants/authorization';
import { ENDPOINT_VACANCY } from '@/constants/endpoints';

interface IVacanciesServiceProps {
  published: '1';
  keyword: string | '';
  payment_from: string | '';
  payment_to: string | '';
  catalogues: string | '';
}

export default async function vacanciesService({
  published,
  keyword,
  payment_from,
  payment_to,
  catalogues,
}: IVacanciesServiceProps) {
  const response = await fetch(ENDPOINT_VACANCY, {
    method: 'POST',
    body: JSON.stringify({
      published: published,
      keyword: keyword,
      payment_from: payment_from,
      payment_to: payment_to,
      catalogues: catalogues,
    }),
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
