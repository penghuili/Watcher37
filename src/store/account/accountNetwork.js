import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageSymmetric,
} from '../../lib/encryption';
import HTTP from '../../lib/HTTP';

export async function fetchAccount() {
  try {
    const { id, username, createdAt, updatedAt, telegramId } = await HTTP.get(`/v1/me`);

    return { data: { userId: id, username, createdAt, updatedAt, telegramId }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteAccount() {
  try {
    await HTTP.delete(`/v1/me`);

    return { data: { success: true }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function addTelegramId(chatId) {
  try {
    const { id, username, createdAt, updatedAt, telegramId } = await HTTP.put(
      `/v1/me/telegram-id`,
      { telegramId: chatId }
    );

    return { data: { userId: id, username, createdAt, updatedAt, telegramId }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function changePassword(username, currentPassword, newPassword) {
  try {
    const { encryptedPrivateKey, encryptedChallenge } = await HTTP.publicGet(
      `/v1/me-public/${username}`
    );
    const privateKey = await decryptMessageSymmetric(currentPassword, encryptedPrivateKey);
    const challenge = await decryptMessage(privateKey, encryptedChallenge);
    const updatedEncryptedPrivateKey = await encryptMessageSymmetric(newPassword, privateKey);
    const updatedUser = await HTTP.post(`/v1/me/password`, {
      encryptedPrivateKey: updatedEncryptedPrivateKey,
      signinChallenge: challenge,
    });

    return { data: updatedUser, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function fetchSettings() {
  try {
    const { lastOpenTime, expiresAt } = await HTTP.get(`/v1/page-watcher/settings`);

    return { data: { lastOpenTime, expiresAt }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateSettings(lastOpenTime) {
  try {
    const { lastOpenTime: updated, expiresAt } = await HTTP.put(`/v1/page-watcher/settings`, { lastOpenTime });

    return { data: { lastOpenTime: updated, expiresAt }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
