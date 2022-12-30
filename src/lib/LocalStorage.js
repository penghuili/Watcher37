import { accessTokenThreshold } from './constants';

export const LocalStorageKeys = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  accessTokenExpiresAt: 'accessTokenExpiresAt',
  publicKey: 'publicKey',
  privateKey: 'privateKey',
};

export const LocalStorage = {
  get(key) {
    // For next.js
    if (typeof window === 'undefined') {
      return '';
    }
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, value) {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof value === 'undefined') {
      localStorage.setItem(key, JSON.stringify(null));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove(key) {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(key);
  },

  resetTokens() {
    LocalStorage.remove(LocalStorageKeys.accessToken);
    LocalStorage.remove(LocalStorageKeys.refreshToken);
    LocalStorage.remove(LocalStorageKeys.accessTokenExpiresAt);
    LocalStorage.remove(LocalStorageKeys.publicKey);
    LocalStorage.remove(LocalStorageKeys.privateKey);
  },
  saveTokens({ accessToken, refreshToken, expiresIn, publicKey, privateKey }) {
    LocalStorage.set(LocalStorageKeys.accessToken, accessToken);
    LocalStorage.set(LocalStorageKeys.refreshToken, refreshToken);
    LocalStorage.set(
      LocalStorageKeys.accessTokenExpiresAt,
      Date.now() + (expiresIn - accessTokenThreshold) * 1000
    );
    if (publicKey && privateKey) {
      LocalStorage.set(LocalStorageKeys.publicKey, publicKey);
      LocalStorage.set(LocalStorageKeys.privateKey, privateKey);
    }
  },
};
