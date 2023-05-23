import {
  ENDPOINT,
  X_SECRET_KEY,
  LOGIN,
  PASSWORD,
  CLIENT_ID,
  CLIENT_SECRET,
  HR,
} from '@/constants/authorization';

export default async function authService() {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      login: LOGIN,
      password: PASSWORD,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      hr: HR,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-secret-key': X_SECRET_KEY,
      'X-Api-App-Id': CLIENT_SECRET,
    },
  });

  if (response.status >= 500 && response.status <= 599) {
    throw new Error('500 Internal Server Error');
  }

  const responseJSON = await response.json();

  localStorage.setItem('access_token', JSON.stringify(responseJSON['access_token']));
  localStorage.setItem('ttl', JSON.stringify(responseJSON['ttl']));
  localStorage.setItem('refresh_token', JSON.stringify(responseJSON['refresh_token']));

  return responseJSON;
}
