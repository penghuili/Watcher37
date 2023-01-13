import { format } from 'date-fns';

export function formatDateTime(date) {
  return format(date, 'yyyy.MM.dd HH:mm:ss');
}
