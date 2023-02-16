import axios from 'axios';
import EventEmitter3 from 'eventemitter3';

import { appActionCreators } from '../store/app/appActions';
import { getHook } from './hooksOutside';
import { LocalStorage, LocalStorageKeys } from './LocalStorage';

function getFullUrl(path) {
  return `${process.env.REACT_APP_API_URL}${path}`;
}

let isRefreshing = false;
const eventemitter = new EventEmitter3();

const HTTP = {
  async publicGet(path) {
    try {
      const { data } = await axios.get(getFullUrl(path));
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async publicPost(path, body) {
    try {
      const { data } = await axios.post(getFullUrl(path), body);
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },

  async post(path, body) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.post(getFullUrl(path), body, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async get(path) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.get(getFullUrl(path), {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async put(path, body) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.put(getFullUrl(path), body, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async delete(path) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.delete(getFullUrl(path), {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },

  handleError(error) {
    const {
      response: { status, data: errorCode },
    } = error;
    if (status === 401) {
      LocalStorage.resetTokens();
      const dispatch = getHook('dispatch');
      dispatch(appActionCreators.reset());
    }

    return { status, errorCode };
  },

  async refreshTokenIfNecessary() {
    if (isRefreshing) {
      await HTTP.waitForRefresh();
      return;
    }

    const expiresAt = LocalStorage.get(LocalStorageKeys.accessTokenExpiresAt);
    const refreshToken = LocalStorage.get(LocalStorageKeys.refreshToken);
    const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
    if (!refreshToken || !accessToken || !expiresAt) {
      throw { response: { status: 401 } };
    }

    if (expiresAt > Date.now()) {
      return;
    }

    isRefreshing = true;
    const data = await HTTP.publicPost(`/v1/sign-in/refresh`, {
      refreshToken,
    });
    LocalStorage.saveTokens(data);
    isRefreshing = false;
  },

  async waitForRefresh() {
    return new Promise(resolve => {
      eventemitter.once('refreshed', () => {
        resolve(true);
      });
    });
  },
};

export default HTTP;
