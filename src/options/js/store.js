import { get } from 'svelte/store';
import { writableLocalStorage } from '@options/js/store-utils';
import InvalidUrlError from '@options/js/InvalidUrlError';
import { isValidUrl, cleanUrl } from '@options/js/string-utils';
import AllreadyExistsUrlError from './AllreadyExistsUrlError';

const blacklist = writableLocalStorage('blacklist', []);

function addToBlacklist(url) {
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(`${url} is invalid`);
  }

  const urlToFind = cleanUrl(url);
  const found = get(blacklist).find((item) => item === urlToFind);

  if (found) {
    throw new AllreadyExistsUrlError(`${url} already exists`);
  }

  blacklist.update((arr) => [...arr, urlToFind]);
}

export { blacklist, addToBlacklist };
