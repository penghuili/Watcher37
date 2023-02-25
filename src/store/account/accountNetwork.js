import apps from '../../shared/js/apps';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

export async function fetchAccount() {
  try {
    const { id, username, createdAt, updatedAt, backendPublicKey } = await HTTP.get(
      apps.auth,
      `/v1/me`
    );

    return {
      data: {
        userId: id,
        username,
        createdAt,
        updatedAt,
        botPublicKey: JSON.parse(`"${backendPublicKey}"`),
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteAccount() {
  try {
    await HTTP.delete(apps.watcher37.name, `/v1/me`);
    await HTTP.delete(apps.auth, `/v1/me`);

    return { data: { success: true }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function changePassword(username, currentPassword, newPassword) {
  try {
    const { encryptedPrivateKey, encryptedChallenge } = await HTTP.publicGet(
      apps.auth,
      `/v1/me-public/${username}`
    );
    const privateKey = await decryptMessageSymmetric(currentPassword, encryptedPrivateKey);
    const challenge = await decryptMessage(privateKey, encryptedChallenge);
    const updatedEncryptedPrivateKey = await encryptMessageSymmetric(newPassword, privateKey);
    const updatedUser = await HTTP.post(apps.auth, `/v1/me/password`, {
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
    const { lastOpenTime, expiresAt, tried, telegramId } = await HTTP.get(
      apps.watcher37.name,
      `/v1/settings`
    );

    return { data: { lastOpenTime, expiresAt, tried, telegramId }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateSettings({ lastOpenTime, telegramId }) {
  try {
    const {
      lastOpenTime: updatedLastOpenTime,
      expiresAt,
      tried,
      telegramId: updatedTelegramId,
    } = await HTTP.put(apps.watcher37.name, `/v1/settings`, {
      lastOpenTime,
      telegramId,
    });

    return {
      data: { lastOpenTime: updatedLastOpenTime, expiresAt, tried, telegramId: updatedTelegramId },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function tryApp() {
  try {
    const {
      lastOpenTime: updated,
      expiresAt,
      tried,
    } = await HTTP.post(apps.watcher37.name, `/v1/try`, {});

    return { data: { lastOpenTime: updated, expiresAt, tried }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function pay(code) {
  try {
    const {
      lastOpenTime: updated,
      expiresAt,
      tried,
    } = await HTTP.post(apps.watcher37.name, `/v1/pay`, { code });

    return { data: { lastOpenTime: updated, expiresAt, tried }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
