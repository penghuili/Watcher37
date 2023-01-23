export const appActionTypes = {
  RESET: 'app/RESET',
  GO_BACK: 'app/GO_BACK',
  NAVIGATE: 'app/NAVIGATE',
};

export const appActionCreators = {
  reset() {
    return { type: appActionTypes.RESET };
  },
  goBack() {
    return { type: appActionTypes.GO_BACK };
  },
  navigate(path) {
    return { type: appActionTypes.NAVIGATE, payload: { path } };
  },
};
