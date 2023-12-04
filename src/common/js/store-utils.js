import { writable, get } from 'svelte/store';
import LocalStorage from '@common/js/LocalStorage';
import ChromeLocalStorage from '@common/js/ChromeLocalStorage';

function setStorage(key, value, isChromeStorage) {
  if (isChromeStorage) {
    ChromeLocalStorage.set(key, JSON.stringify(value));
  } else {
    LocalStorage.set(key, JSON.stringify(value));
  }
}

function writableStorage(key, initialValue, isChromeStorage = false) {
  let storageValue;
  let writableValue;

  if (isChromeStorage) {
    // hack because chrome storage is ASYNChronous
    chrome.storage.local.get([key], (result) => {
      storageValue = result[key];
      // TO DEBUG
      // console.log(key, storageValue, '🟡');
      const initial = storageValue !== undefined ? JSON.parse(storageValue) : initialValue;
      writableValue.set(initial);
    });
    writableValue = writable(storageValue);
  } else {
    // localStorage is SYNChronous => no hack needed
    storageValue = LocalStorage.get(key);
    const initial = storageValue ? JSON.parse(storageValue) : initialValue;
    writableValue = writable(initial);
  }

  // SYNC store =to=> Storage
  if (!storageValue && initialValue) {
    if (!isChromeStorage) {
      setStorage(key, initialValue, isChromeStorage);
    }
  }

  // SYNC Storage =to=> store
  const updateFromLocalStorage = (e) => {
    if (e.key === key) {
      const newValue = e.newValue ? JSON.parse(e.newValue) : null;
      set(newValue);
    }
  };
  const updateFromChromeStorage = (changes) => {
    if (changes[key]?.['newValue']) {
      const newValue = JSON.parse(changes[key]?.['newValue']);
      set(newValue);
    }
  };

  // LISTEN for changes in Storage
  if (isChromeStorage) {
    chrome.storage.onChanged.addListener(updateFromChromeStorage);
  } else {
    window.addEventListener('storage', updateFromLocalStorage);
  }

  const { subscribe, update, set } = writableValue;

  return {
    subscribe,
    set: (value) => {
      set(value);
      setStorage(key, value, isChromeStorage);
    },
    update: (updater) => {
      const value = updater(get(writableValue));
      update(updater);
      setStorage(key, value, isChromeStorage);
    },
    clear: () => {
      set(initialValue);
      setStorage(key, initialValue, isChromeStorage);
    },
    destroy: () => {
      window.removeEventListener('storage', updateFromLocalStorage);
      chrome.storage.onChanged.removeListener(updateFromChromeStorage);
    },
  };
}

function writableLocalStorage(key, initialValue) {
  return writableStorage(key, initialValue);
}

function writableChromeStorage(key, initialValue) {
  return writableStorage(key, initialValue, true);
}

export { writableLocalStorage, writableChromeStorage };
