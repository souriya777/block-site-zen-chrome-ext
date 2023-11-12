import { writable, get } from 'svelte/store';

function writableLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : initialValue;
  const writableValue = writable(initial);
  const { subscribe, update, set } = writableValue;

  // SYNC store =to=> LocalStorage
  if (!stored && initialValue) {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  // SYNC LocalStorage =to=> store
  const updateFromLocalStorage = (e) => {
    if (e.key === key) {
      const newValue = e.newValue ? JSON.parse(e.newValue) : null;
      set(newValue);
    }
  };

  // LISTEN for changes in LocalStorage
  window.addEventListener('storage', updateFromLocalStorage);

  return {
    subscribe,
    set: (value) => {
      set(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    update: (updater) => {
      const value = updater(get(writableValue));
      update(updater);
      localStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
      set(initialValue);
      localStorage.setItem(key, JSON.stringify(initialValue));
    },
    destroy: () => {
      window.removeEventListener('storage', updateFromLocalStorage);
    },
  };
}

export { writableLocalStorage };
