import { useEffect } from 'react';

export function useListener(value, callback, getValue) {
  useEffect(() => {
    callback(typeof getValue === 'function' ? getValue(value) : value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
