import { formatDate } from '../../lib/date';

export const accountSelectors = {
  getAccount: state => ({
    userId: state.account.userId,
    username: state.account.username,
    createdAt: state.account.createdAt,
    telegramId: state.account.telegramId
  }),
  getLastOpenTime: state => state.account.lastOpenTime,
  isAccountValid: state => {
    const expiresAt = accountSelectors.getExpiresAt(state);
    const today = formatDate(new Date());
    return !!expiresAt && expiresAt >= today;
  },
  getExpiresAt: state => state.account.expiresAt,
  tried: state => state.account.tried,
  getPayError: state => state.account.payError,
  getBotPublicKey: state => state.account.botPublicKey,
  isLoading: state => state.account.isLoading,
  isLoadingSettings: state => state.account.isLoadingSettings,
};
