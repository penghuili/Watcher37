export const accountActionTypes = {
  IS_LOADING: 'account/IS_LOADING',
  SET_USER_DATA: 'account/SET_USER_DATA',
  VIEW_ENTERED: 'account/VIEW_ENTERED',
  DELETE_PRESSED: 'account/DELETE_PRESSED',
};

export const accountActionCreators = {
  isLoading(loading) {
    return { type: accountActionTypes.IS_LOADING, payload: { loading } };
  },
  setUserData(userId, username, createdAt) {
    return {
      type: accountActionTypes.SET_USER_DATA,
      payload: { userId, username, createdAt },
    };
  },
  viewEntered() {
    return { type: accountActionTypes.VIEW_ENTERED };
  },
  deletePressed() {
    return { type: accountActionTypes.DELETE_PRESSED };
  },
};
