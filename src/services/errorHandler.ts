import type { KyResponse } from 'ky';

export async function handleHttpError(
  error: unknown,
): Promise<KyResponse | unknown> {
  if (isHttpError(error)) {
    const errorJson = (await error.response.json()) as KyResponse;
    return errorJson;
  }
  return error;
}

function isHttpError(error: unknown): error is HTTPError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    'response' in error &&
    (error as { name: string }).name === 'HTTPError'
  );
}

interface HTTPError extends Error {
  response: Response;
}
