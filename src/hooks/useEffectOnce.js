import { useEffect } from 'react';

export function useEffectOnce(callback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}
