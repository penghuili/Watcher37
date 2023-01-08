import HTTP from '../../lib/HTTP';

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

    return { data: watchers, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createWatcher({ link, selector }) {
  try {
    const watcher = await HTTP.post(`/v1/page-watcher/watchers`, { link, selector });

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
    const watcher = await HTTP.get(`/v1/page-watcher/watchers/${id}`);

    return { data: watcher, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
