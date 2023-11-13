import { get } from 'svelte/store';
import { writableChromeStorage } from '@common/js/store-utils';
import { isValidUrl, cleanUrl } from '@common/js/string-utils';
import InvalidUrlError from '@common/js/InvalidUrlError';
import AllreadyExistsUrlError from '@common/js/AllreadyExistsUrlError';

const blacklist = writableChromeStorage('blacklist', []);

function addToBlacklist(url) {
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(`${url} is invalid`);
  }

  const urlToFind = cleanUrl(url);
  const found = get(blacklist).find((item) => item === urlToFind);

  if (found) {
    throw new AllreadyExistsUrlError(`${url} already exists`);
  }

  console.log('addToBlacklist', get(blacklist));

  blacklist.update((arr) => [...arr, urlToFind]);
}

function isBlacklisted(url) {
  const urlToFind = cleanUrl(url);
  console.log('😎', urlToFind, get(blacklist));
  // FIXME duplicate code
  // const found = get(blacklist).find((item) => item.includes(urlToFind));
  // return found != null;
  return false;
}

export { blacklist, addToBlacklist, isBlacklisted };
