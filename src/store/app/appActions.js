export const appActionTypes = {
  RESET: 'app/RESET',
};

export const appActionCreators = {
  reset() {
    return { type: appActionTypes.RESET };
  },
};
