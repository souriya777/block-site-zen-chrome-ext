class LocalStorage {
  /** @type {import('@options/js/storage').Storage['get']} */
  async get(key) {
    const value = localStorage.getItem(key);

    if (!value) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve(JSON.parse(value));
  }

  /** @type {import('@options/js/storage').Storage['set']} */
  async set(key, value) {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }

  /** @type {import('@options/js/storage').Storage['remove']} */
  async remove(key) {
    return Promise.resolve(localStorage.removeItem(key));
  }
}

export default LocalStorage;
