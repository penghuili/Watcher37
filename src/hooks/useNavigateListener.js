import useBus from 'use-bus';
import { useLocation } from 'wouter';

import { navigationBusAction } from '../lib/constants';

export function useNavigateListner() {
  const [, navigate] = useLocation();
  useBus(
    navigationBusAction,
    action => navigate(action.payload.path, { replace: !!action.payload.replace }),
    []
  );
}
