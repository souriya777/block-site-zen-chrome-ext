import { writable } from 'svelte/store';

function writableLocalStorage(key, initialValue) {
  let storedValue = localStorage.getItem(key);
  let value = writable(storedValue ? JSON.parse(storedValue) : initialValue);

  const write = (key, initialValue) => {
    const lastValue = localStorage.getItem(key) || initialValue;
    value = writable(lastValue);
  };

  value.subscribe((val) => {
    if ([null, undefined].includes(val)) {
      localStorage.removeItem(key);
      document.removeEventListener('storage', write);
    } else {
      localStorage.setItem(key, JSON.stringify(val));
      document.addEventListener('storage', write);
    }
  });

  return value;
}

export { writableLocalStorage };
