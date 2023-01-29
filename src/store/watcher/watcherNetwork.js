import { asyncForEach } from '../../lib/asyncForEach';
import { decryptMessage, encryptMessage } from '../../lib/encryption';
import HTTP from '../../lib/HTTP';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

async function encryptWatcherContent(watcher, needToEncrypt, botPublicKey) {
  if (!needToEncrypt) {
    return watcher;
  }

  const { title, selector, link, content, contentLink } = watcher;

  const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessage(publicKey, title) : title;
  const encryptedLink = link ? await encryptMessage(publicKey, link) : link;
  const encryptedLinkForBot = link ? await encryptMessage(botPublicKey, link) : link;
  const encryptedSelector = selector ? await encryptMessage(publicKey, selector) : selector;
  const encryptedSelectorForBot = selector
    ? await encryptMessage(botPublicKey, selector)
    : selector;
  const encryptedContent = content ? await encryptMessage(publicKey, content) : null;
  const encryptedContentLink = contentLink ? await encryptMessage(publicKey, contentLink) : null;

  return {
    ...watcher,
    title: encryptedTitle,
    link: encryptedLink,
    linkForBot: encryptedLinkForBot,
    selector: encryptedSelector,
    selectorForBot: encryptedSelectorForBot,
    content: encryptedContent,
    contentLink: encryptedContentLink,
  };
}

async function decryptWatcherContent(watcher) {
  if (!watcher.encrypted) {
    return watcher;
  }

  const { title, selector, link, content, contentLink } = watcher;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessage(privateKey, title);
  const decryptedLink = await decryptMessage(privateKey, link);
  const decryptedSelector = await decryptMessage(privateKey, selector);
  const decryptedContent = content ? await decryptMessage(privateKey, content) : null;
  const decryptedContentLink = contentLink ? await decryptMessage(privateKey, contentLink) : null;

  return {
    ...watcher,
    title: decryptedTitle,
    link: decryptedLink,
    selector: decryptedSelector,
    content: decryptedContent,
    contentLink: decryptedContentLink,
  };
}

async function decryptWatcherItemContent(item) {
  if (!item.encrypted) {
    return item;
  }

  const { content, contentLink } = item;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedContent = content ? await decryptMessage(privateKey, content) : null;
  const decryptedContentLink = contentLink ? await decryptMessage(privateKey, contentLink) : null;

  return {
    ...item,
    content: decryptedContent,
    contentLink: decryptedContentLink,
  };
}

export async function fetchPageContent(link, selector) {
  try {
    const { content } = await HTTP.post(`/v1/page-watcher/content`, { link, selector });

    return { data: { content }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatchers() {
  try {
    const watchers = await HTTP.get(`/v1/page-watcher/watchers`);

    const decryptedWatchers = [];
    await asyncForEach(watchers, async watcher => {
      const decrypted = await decryptWatcherContent(watcher);
      decryptedWatchers.push(decrypted);
    });

    return { data: decryptedWatchers, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createWatcher({ title, link, selector }, botPublicKey) {
  try {
    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
    } = await encryptWatcherContent({ title, link, selector }, true, botPublicKey);

    const watcher = await HTTP.post(`/v1/page-watcher/watchers`, {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
    });

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateWatcher(
  id,
  { encrypted, title, selector, link, skipPersonalTelegram, telegramId, isPublic },
  botPublicKey
) {
  try {
    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
    } = await encryptWatcherContent(
      { needToEncrypt: encrypted, title, link, selector },
      encrypted,
      botPublicKey
    );

    const watcher = await HTTP.put(`/v1/page-watcher/watchers/${id}`, {
      title: encryptedTitle,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      skipPersonalTelegram,
      telegramId,
      isPublic,
    });
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function encryptWatcher(
  id,
  { title, selector, link, content, contentLink },
  botPublicKey
) {
  try {
    const {
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
      content: encryptedContent,
      contentLink: encryptedContentLink,
    } = await encryptWatcherContent(
      { title, selector, link, content, contentLink },
      true,
      botPublicKey
    );

    const watcher = await HTTP.put(`/v1/page-watcher/watchers/${id}`, {
      encrypted: true,
      isPublic: false,
      encryptedAt: Date.now(),
      title: encryptedTitle,
      link: encryptedLink,
      linkForBot: encryptedLinkForBot,
      selector: encryptedSelector,
      selectorForBot: encryptedSelectorForBot,
      content: encryptedContent,
      contentLink: encryptedContentLink,
    });

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function decryptWatcher(id, { title, selector, link, content, contentLink }) {
  try {
    const {
      title: decryptedTitle,
      link: decryptedLink,
      selector: decryptedSelector,
      content: decryptedContent,
      contentLink: decryptedContentLink,
    } = await decryptWatcherContent({ title, selector, link, content, contentLink });

    const watcher = await HTTP.put(`/v1/page-watcher/watchers/${id}`, {
      encrypted: false,
      decryptedAt: Date.now(),
      title: decryptedTitle,
      link: decryptedLink,
      linkForBot: decryptedLink,
      selector: decryptedSelector,
      selectorForBot: decryptedSelector,
      content: decryptedContent,
      contentLink: decryptedContentLink,
    });

    return { data: watcher, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteWatcher(id) {
  try {
    await HTTP.delete(`/v1/page-watcher/watchers/${id}`);

    return { data: { id }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatcher(id) {
  try {
    const hasToken =
      LocalStorage.get(LocalStorageKeys.refreshToken) &&
      LocalStorage.get(LocalStorageKeys.accessToken);

    const watcher = hasToken
      ? await HTTP.get(`/v1/page-watcher/watchers/${id}`)
      : await HTTP.publicGet(`/v1/page-watcher/watchers/${id}`);

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatcherHistory(id, startKey) {
  try {
    const hasToken =
      LocalStorage.get(LocalStorageKeys.refreshToken) &&
      LocalStorage.get(LocalStorageKeys.accessToken);

    const query = startKey ? `?startKey=${startKey}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = hasToken
      ? await HTTP.get(`/v1/page-watcher/watchers/${id}/history${query}`)
      : await HTTP.publicGet(`/v1/page-watcher/watchers/${id}/history${query}`);

    const decryptedItems = [];
    if (items?.length) {
      await asyncForEach(items, async item => {
        try {
          const decryptedItem = await decryptWatcherItemContent(item);
          decryptedItems.push(decryptedItem);
          // eslint-disable-next-line no-empty
        } catch (e) {}
      });
    }

    return {
      data: {
        items: decryptedItems,
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
    const { watcher, item } = await HTTP.get(`/v1/page-watcher/watchers/${id}/check`);
    const decrypted = await decryptWatcherContent(watcher);
    const decryptedItem = item ? await decryptWatcherItemContent(item) : null;

    return { data: { watcher: decrypted, item: decryptedItem }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function scheduleTrigger(id, rate) {
  try {
    const watcher = await HTTP.post(`/v1/page-watcher/watchers/${id}/trigger`, { rate });
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTrigger(id) {
  try {
    const watcher = await HTTP.delete(`/v1/page-watcher/watchers/${id}/trigger`);
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteItem(id, sortKey) {
  try {
    await HTTP.delete(`/v1/page-watcher/watchers/${id}/items/${sortKey}`);

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
