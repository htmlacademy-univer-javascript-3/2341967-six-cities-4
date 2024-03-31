import dayjs from 'dayjs';

const RELEASE_DATE_FORMAT = 'MMMM YYYY';

export function getStars(rating: number): string {
  return `${20 * rating}%`;
}

export function conversionDate(date: string): string {
  return date ? dayjs(date).format(RELEASE_DATE_FORMAT) : '';
}
