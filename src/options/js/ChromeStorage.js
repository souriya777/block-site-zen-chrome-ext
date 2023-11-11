/** @type {import('./chrome-storage-local').chrome.storage.LocalStorageArea} */
// @ts-ignore
// eslint-disable-next-line no-undef
const local = chrome.storage.local;

class ChromeStorage {
  /** @type {import('@options/js/storage').Storage['get']} */
  async get(key) {
    const value = await local.get([key]);

    if (!value?.[key]) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve(JSON.parse(value[key]));
  }

  /** @type {import('@options/js/storage').Storage['set']} */
  async set(key, value) {
    const json = JSON.stringify(value);
    return local.set({ [key]: json });
  }

  /** @type {import('@options/js/storage').Storage['remove']} */
  async remove(key) {
    return local.remove(key);
  }
}

export default new ChromeStorage();
