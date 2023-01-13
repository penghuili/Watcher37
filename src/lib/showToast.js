import { toast } from 'react-toastify';

export function showToast(message, type = 'success') {
  toast(message, {
    position: 'top-left',
    type,
  });
}
