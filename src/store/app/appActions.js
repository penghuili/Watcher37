export const appActionTypes = {
  RESET: 'app/RESET',
  GO_BACK: 'app/GO_BACK',
};

export const appActionCreators = {
  reset() {
    return { type: appActionTypes.RESET };
  },
  goBack() {
    return { type: appActionTypes.GO_BACK };
  },
};
