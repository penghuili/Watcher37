export const accountSelectors = {
  getAccount: state => ({
    userId: state.account.userId,
    username: state.account.username,
    createdAt: state.account.createdAt,
    telegramId: state.account.telegramId,
  }),
  isLoading: state => state.account.isLoading,
};
