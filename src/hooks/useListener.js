import { useEffect } from 'react';

export function useListener(value, callback, defaultValue) {
  useEffect(() => {
    callback(value === undefined ? defaultValue : value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
