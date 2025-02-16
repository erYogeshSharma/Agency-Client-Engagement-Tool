import { jwtDecode } from 'jwt-decode';
import { BASE_API_URL } from '@/config';
import { authActions } from '@/features/auth/auth.slice';
import { RootState, store } from '../store';

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    return null;
  }
}

export async function checkToken(headers: Headers, getState: () => RootState) {
  const state = getState() as RootState;
  const token = state.auth.tokens?.accessToken;
  const refreshToken = state.auth.tokens?.refreshToken;

  if (token) {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }

  // Token expired: Try to refresh
  if (refreshToken) {
    const newToken = await refreshAccessToken(refreshToken);
    if (newToken) {
      store.dispatch(authActions.setAccessToken({ accessToken: newToken, refreshToken }));
      headers.set('authorization', `Bearer ${newToken}`);
    }
  }

  return headers;
}
