import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import { apps } from '../../shared/js/apps';
import { asyncForAll } from '../../shared/js/asyncForAll';
import { decryptMessageAsymmetric, encryptMessageAsymmetric } from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';
import { idbStorage } from '../../shared/react/indexDB';

export async function updateSettings({ lastOpenTime, telegramId }) {
  try {
    const {
      lastOpenTime: updatedLastOpenTime,
      expiresAt,
      telegramId: updatedTelegramId,
    } = await HTTP.put(apps.Watcher37.name, `/v1/settings`, {
      lastOpenTime,
      telegramId,
    });

    return {
      data: { lastOpenTime: updatedLastOpenTime, expiresAt, telegramId: updatedTelegramId },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptWatcherContent(watcher, needToEncrypt, botPublicKey) {
  if (!needToEncrypt) {
    return watcher;
  }

  const { title, selectors, link } = watcher;

  const publicKey = LocalStorage.get(sharedLocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessageAsymmetric(publicKey, title) : title;
  const encryptedLink = link ? await encryptMessageAsymmetric(publicKey, link) : link;
  const encryptedLinkForBot = link ? await encryptMessageAsymmetric(botPublicKey, link) : link;

  const encryptedSelectors = await asyncForAll(selectors, async selector => {
    const encryptedSelectorTitle = await encryptMessageAsymmetric(publicKey, selector.title);
    const encryptedSelectorSelector = await encryptMessageAsymmetric(publicKey, selector.selector);
    const encryptedSelectorForBot = await encryptMessageAsymmetric(botPublicKey, selector.selector);

    return {
      title: encryptedSelectorTitle,
      selector: encryptedSelectorSelector,
      selectorForBot: encryptedSelectorForBot,
      ignoreNotify: !!selector.ignoreNotify,
    };
  });

  return {
    ...watcher,
    title: encryptedTitle,
    link: encryptedLink,
    linkForBot: encryptedLinkForBot,
    selectors: selectors ? encryptedSelectors : selectors,
  };
}

async function encryptContents(publicKey, contents) {
  const encryptedContents = await asyncForAll(contents, async item => {
    const encryptedSelector = await encryptMessageAsymmetric(publicKey, item.selector);
    const encryptedContent = item.content
      ? await encryptMessageAsymmetric(publicKey, item.content)
      : null;
    const encryptedContentLink = item.contentLink
      ? await encryptMessageAsymmetric(publicKey, item.contentLink)
      : null;

    return {
      selector: encryptedSelector,
      content: encryptedContent,
      contentLink: encryptedContentLink,
    };
  });

  return contents ? encryptedContents : contents;
}

async function decryptContents(privateKey, contents) {
  const decryptedContents = await asyncForAll(contents, async item => {
    const decryptedSelector = item.selector
      ? await decryptMessageAsymmetric(privateKey, item.selector)
      : null;
    const decryptedContent = item.content
      ? await decryptMessageAsymmetric(privateKey, item.content)
      : null;
    const decryptedContentLink = item.contentLink
      ? await decryptMessageAsymmetric(privateKey, item.contentLink)
      : null;

    return {
      selector: decryptedSelector,
      content: decryptedContent,
      contentLink: decryptedContentLink,
    };
  });

  return decryptedContents;
}

function addSelectorTitleToContents(contents, selectors) {
  if (!selectors?.length || !contents?.length) {
    return contents;
  }

  const selectorsObj = {};
  selectors.forEach(s => {
    selectorsObj[s.selector] = s;
  });

  const updatedContents = contents.map(c => {
    const selector = selectorsObj[c.selector];
    return selector ? { ...c, selectorTitle: selector.title } : c;
  });

  return updatedContents;
}

function mapWatcher(watcher) {
  return {
    ...watcher,
    selectors: (watcher.selectors || []).map(s => ({ ...s, id: s.selector })),
    contents: addSelectorTitleToContents(watcher.contents, watcher.selectors),
  };
}

async function decryptWatcherContent(watcher) {
  if (!watcher.encrypted) {
    return mapWatcher(watcher);
  }

  const { title, link, selectors, contents } = watcher;

  const privateKey = LocalStorage.get(sharedLocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessageAsymmetric(privateKey, title);
  const decryptedLink = await decryptMessageAsymmetric(privateKey, link);

  const decryptedSelectors = await asyncForAll(selectors, async selector => {
    const decryptedSelectorTitle = selector.title
      ? await decryptMessageAsymmetric(privateKey, selector.title)
      : selector.title;
    const decryptedSelectorSelector = await decryptMessageAsymmetric(privateKey, selector.selector);

    return {
      title: decryptedSelectorTitle,
      selector: decryptedSelectorSelector,
      selectorForBot: decryptedSelectorSelector,
      ignoreNotify: !!selector.ignoreNotify,
    };
  });

  const decryptedContents = await decryptContents(privateKey, contents);
  const decryptedWatcher = {
    ...watcher,
    title: decryptedTitle,
    link: decryptedLink,
    selectors: decryptedSelectors,
    contents: decryptedContents,
  };

  return mapWatcher(decryptedWatcher);
}

function mapItem(item, selectors) {
  const updatedItem = {
    ...item,
    contents: addSelectorTitleToContents(item.contents, selectors),
  };

  return updatedItem;
}

async function decryptWatcherItemContent(item, selectors) {
  if (!item.encrypted) {
    return mapItem(item, selectors);
  }

  const { contents } = item;

  const privateKey = LocalStorage.get(sharedLocalStorageKeys.privateKey);
  const decryptedContents = await decryptContents(privateKey, contents);
  const decryptedItem = {
    ...item,
    contents: decryptedContents,
  };

  return mapItem(decryptedItem, selectors);
}

export async function fetchPageContent(link, selector) {
  try {
    const { content, contentLink } = await HTTP.post(apps.Watcher37.name, `/v1/content`, {
      link,
      selector,
    });

    return { data: { content, contentLink }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatchers() {
  try {
    const watchers = await HTTP.get(apps.Watcher37.name, `/v1/watchers`);

    const decryptedWatchers = await asyncForAll(watchers, async watcher => {
      try {
        const decrypted = await decryptWatcherContent(watcher);
        return decrypted;
        // eslint-disable-next-line no-empty
      } catch (e) {
        console.log(e, watcher);
        return null;
      }
    });

    return { data: decryptedWatchers.filter(w => w), error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

function addSelectorForBotForSelectors(selectors) {
  return selectors
    ? selectors.map(s => ({ ...s, selectorForBot: s.selectorForBot || s.selector }))
    : selectors;
}

export async function createWatcher({ title, link, selectors }, botPublicKey) {
  try {
    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: encryptedSelectors,
    } = await encryptWatcherContent({ title, link, selectors }, true, botPublicKey);

    const watcher = await HTTP.post(apps.Watcher37.name, `/v1/watchers`, {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: addSelectorForBotForSelectors(encryptedSelectors),
    });

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateWatcher(
  id,
  { encrypted, title, selectors, link, skipPersonalTelegram, telegramId, isPublic, noDuplication },
  botPublicKey
) {
  try {
    if (encrypted === undefined) {
      throw new Error('NO_encrypted');
    }

    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: encryptedSelectors,
    } = await encryptWatcherContent({ title, link, selectors }, encrypted, botPublicKey);

    const watcher = await HTTP.put(apps.Watcher37.name, `/v1/watchers/${id}`, {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: addSelectorForBotForSelectors(encryptedSelectors),
      skipPersonalTelegram,
      telegramId,
      isPublic,
      noDuplication,
    });
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function encryptWatcher(id, { title, selectors, link, contents }, botPublicKey) {
  try {
    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: encryptedSelectors,
    } = await encryptWatcherContent({ title, selectors, link }, true, botPublicKey);
    const publicKey = LocalStorage.get(sharedLocalStorageKeys.publicKey);
    const encryptedContents = await encryptContents(publicKey, contents);

    const watcher = await HTTP.put(apps.Watcher37.name, `/v1/watchers/${id}`, {
      encrypted: true,
      isPublic: false,
      encryptedAt: Date.now(),
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selectors: encryptedSelectors,
      contents: encryptedContents,
    });

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function decryptWatcher(id, { title, link, selectors, contents }) {
  try {
    const {
      title: decryptedTitle,
      link: decryptedLink,
      selectors: decryptedSelectors,
      contents: decryptedContents,
    } = await decryptWatcherContent({ title, link, selectors, contents });

    const watcher = await HTTP.put(apps.Watcher37.name, `/v1/watchers/${id}`, {
      encrypted: false,
      decryptedAt: Date.now(),
      title: decryptedTitle,
      link: decryptedLink,
      linkForBot: decryptedLink,
      selectors: decryptedSelectors,
      contents: decryptedContents,
    });

    return { data: watcher, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteWatcher(id) {
  try {
    await HTTP.delete(apps.Watcher37.name, `/v1/watchers/${id}`);

    return { data: { id }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatcher(id) {
  try {
    const hasToken =
      LocalStorage.get(sharedLocalStorageKeys.refreshToken) &&
      LocalStorage.get(sharedLocalStorageKeys.accessToken);

    const watcher = hasToken
      ? await HTTP.get(apps.Watcher37.name, `/v1/watchers/${id}`)
      : await HTTP.publicGet(apps.Watcher37.name, `/v1/watchers/${id}`);

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatcherHistory(id, startKey, watcher) {
  try {
    const hasToken =
      LocalStorage.get(sharedLocalStorageKeys.refreshToken) &&
      LocalStorage.get(sharedLocalStorageKeys.accessToken);

    const query = startKey ? `?startKey=${startKey}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = hasToken
      ? await HTTP.get(apps.Watcher37.name, `/v1/watchers/${id}/history${query}`)
      : await HTTP.publicGet(apps.Watcher37.name, `/v1/watchers/${id}/history${query}`);

    const decryptedItems = await asyncForAll(items, async item => {
      try {
        const decryptedItem = await decryptWatcherItemContent(item, watcher?.selectors);
        return decryptedItem;
        // eslint-disable-next-line no-empty
      } catch (e) {
        return null;
      }
    });

    return {
      data: {
        items: decryptedItems.filter(i => i),
        startKey: newStartKey,
        hasMore: decryptedItems.length === limit,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function checkWatcher(id) {
  try {
    const { watcher, item } = await HTTP.get(apps.Watcher37.name, `/v1/watchers/${id}/check`);
    const decrypted = await decryptWatcherContent(watcher);
    const decryptedItem = item ? await decryptWatcherItemContent(item, watcher?.selectors) : null;

    return { data: { watcher: decrypted, item: decryptedItem }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function scheduleTrigger(id, rate, cron) {
  try {
    const watcher = await HTTP.post(apps.Watcher37.name, `/v1/watchers/${id}/trigger`, {
      rate,
      cron,
    });
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTrigger(id) {
  try {
    const watcher = await HTTP.delete(apps.Watcher37.name, `/v1/watchers/${id}/trigger`);
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteItem(id, sortKey) {
  try {
    await HTTP.delete(apps.Watcher37.name, `/v1/watchers/${id}/items/${sortKey}`);

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchTelegramChannels() {
  try {
    const infos = await HTTP.get(apps.Watcher37.name, `/v1/telegram/user-info`);

    if (infos?.length) {
      await idbStorage.setItem('watcher37-telegramChannels', infos);
    }

    return { data: infos, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
