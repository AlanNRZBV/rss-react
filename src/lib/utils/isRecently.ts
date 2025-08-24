import dayjs from 'dayjs';

export const isRecently = (timestamp: string): boolean => {
  const parsed = dayjs(timestamp, 'YYYY.MM.DD / HH:mm');
  if (!parsed.isValid()) {
    return false;
  }
  const now = dayjs();
  return now.diff(parsed, 'second') <= 60;
};
