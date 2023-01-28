export const accountSelectors = {
  getAccount: state => ({
    userId: state.account.userId,
    username: state.account.username,
    createdAt: state.account.createdAt,
    telegramId: state.account.telegramId,
  }),
  getLastOpenTime: state => state.account.lastOpenTime,
  getExpiresAt: state => state.account.expiresAt,
  getBotPublicKey: state => state.account.botPublicKey,
  isLoading: state => state.account.isLoading,
};
