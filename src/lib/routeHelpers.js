import { getHook } from './hooksOutside';

export const routeHelpers = {
  navigate: path => {
    const location = getHook('location');
    location[1](path, { replace: false });
  },
  replace: path => {
    const location = getHook('location');
    location[1](path, { replace: true });
  },
  goBack() {
    if (history.length > 1) {
      history.back();
    } else {
      routeHelpers.navigate('/');
    }
  },
};
