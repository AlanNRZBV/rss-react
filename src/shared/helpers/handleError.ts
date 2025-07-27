import axios from 'axios';

export const handleError = (e: unknown): BasicError => {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status ?? 0;
    const message = e.message ?? 'Unknown error';
    return { status, message };
  } else {
    console.error('Unexpected error ---', e);
    return { status: 0, message: 'Unexpected error' };
  }
};
