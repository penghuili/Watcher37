import { asyncForEach } from '../../lib/asyncForEach';
import { decryptMessage, encryptMessage } from '../../lib/encryption';
import HTTP, { servers } from '../../lib/HTTP';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

async function encryptWatcherContent(watcher, needToEncrypt, botPublicKey) {
  if (!needToEncrypt) {
    return watcher;
  }

  const { title, selectors, link } = watcher;

  const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessage(publicKey, title) : title;
  const encryptedLink = link ? await encryptMessage(publicKey, link) : link;
  const encryptedLinkForBot = link ? await encryptMessage(botPublicKey, link) : link;

  const encryptedSelectors = [];
  await asyncForEach(selectors, async selector => {
    const encryptedSelectorTitle = await encryptMessage(publicKey, selector.title);
    const encryptedSelectorSelector = await encryptMessage(publicKey, selector.selector);
    const encryptedSelectorForBot = await encryptMessage(botPublicKey, selector.selector);

    encryptedSelectors.push({
      title: encryptedSelectorTitle,
      selector: encryptedSelectorSelector,
      selectorForBot: encryptedSelectorForBot,
    });
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
  const encryptedContents = [];

  await asyncForEach(contents, async item => {
    const encryptedSelector = await encryptMessage(publicKey, item.selector);
    const encryptedContent = item.content ? await encryptMessage(publicKey, item.content) : null;
    const encryptedContentLink = item.contentLink
      ? await encryptMessage(publicKey, item.contentLink)
      : null;

    encryptedContents.push({
      selector: encryptedSelector,
      content: encryptedContent,
      contentLink: encryptedContentLink,
    });
  });

  return contents ? encryptedContents : contents;
}

async function decryptContents(privateKey, contents) {
  const decryptedContents = [];

  await asyncForEach(contents, async item => {
    const decryptedSelector = item.selector
      ? await decryptMessage(privateKey, item.selector)
      : null;
    const decryptedSelectorTitle = item.selectorTitle
      ? await decryptMessage(privateKey, item.selectorTitle)
      : null;
    const decryptedContent = item.content ? await decryptMessage(privateKey, item.content) : null;
    const decryptedContentLink = item.contentLink
      ? await decryptMessage(privateKey, item.contentLink)
      : null;

    decryptedContents.push({
      selector: decryptedSelector,
      selectorTitle: decryptedSelectorTitle,
      content: decryptedContent,
      contentLink: decryptedContentLink,
    });
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
  return { ...watcher, contents: addSelectorTitleToContents(watcher.contents, watcher.selectors) };
}

async function decryptWatcherContent(watcher) {
  if (!watcher.encrypted) {
    return mapWatcher(watcher);
  }

  const { title, link, selectors, contents } = watcher;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessage(privateKey, title);
  const decryptedLink = await decryptMessage(privateKey, link);

  const decryptedSelectors = [];
  await asyncForEach(selectors, async selector => {
    const decryptedSelectorTitle = selector.title
      ? await decryptMessage(privateKey, selector.title)
      : selector.title;
    const decryptedSelectorSelector = await decryptMessage(privateKey, selector.selector);

    decryptedSelectors.push({
      title: decryptedSelectorTitle,
      selector: decryptedSelectorSelector,
    });
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

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedContents = await decryptContents(privateKey, contents);
  const decryptedItem = {
    ...item,
    contents: decryptedContents,
  };

  return mapItem(decryptedItem, selectors);
}

export async function fetchPageContent(link, selector) {
  try {
    const { content, contentLink } = await HTTP.post(servers.watcher37, `/v1/content`, {
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
    const watchers = await HTTP.get(servers.watcher37, `/v1/watchers`);

    const decryptedWatchers = [];
    await asyncForEach(watchers, async watcher => {
      try {
        const decrypted = await decryptWatcherContent(watcher);
        decryptedWatchers.push(decrypted);
        // eslint-disable-next-line no-empty
      } catch (e) {
        console.log(e, watcher);
      }
    });

    return { data: decryptedWatchers, error: null };
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

    const watcher = await HTTP.post(servers.watcher37, `/v1/watchers`, {
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

    const watcher = await HTTP.put(servers.watcher37, `/v1/watchers/${id}`, {
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
    const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
    const encryptedContents = await encryptContents(publicKey, contents);

    const watcher = await HTTP.put(servers.watcher37, `/v1/watchers/${id}`, {
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

    const watcher = await HTTP.put(servers.watcher37, `/v1/watchers/${id}`, {
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
    await HTTP.delete(servers.watcher37, `/v1/watchers/${id}`);

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
      ? await HTTP.get(servers.watcher37, `/v1/watchers/${id}`)
      : await HTTP.publicGet(servers.watcher37, `/v1/watchers/${id}`);

    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchWatcherHistory(id, startKey, watcher) {
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
      ? await HTTP.get(servers.watcher37, `/v1/watchers/${id}/history${query}`)
      : await HTTP.publicGet(servers.watcher37, `/v1/watchers/${id}/history${query}`);

    const decryptedItems = [];
    if (items?.length) {
      await asyncForEach(items, async item => {
        try {
          const decryptedItem = await decryptWatcherItemContent(item, watcher?.selectors);
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
    const { watcher, item } = await HTTP.get(servers.watcher37, `/v1/watchers/${id}/check`);
    const decrypted = await decryptWatcherContent(watcher);
    const decryptedItem = item ? await decryptWatcherItemContent(item, watcher?.selectors) : null;

    return { data: { watcher: decrypted, item: decryptedItem }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function scheduleTrigger(id, rate) {
  try {
    const watcher = await HTTP.post(servers.watcher37, `/v1/watchers/${id}/trigger`, {
      rate,
    });
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTrigger(id) {
  try {
    const watcher = await HTTP.delete(servers.watcher37, `/v1/watchers/${id}/trigger`);
    const decrypted = await decryptWatcherContent(watcher);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteItem(id, sortKey) {
  try {
    await HTTP.delete(servers.watcher37, `/v1/watchers/${id}/items/${sortKey}`);

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
