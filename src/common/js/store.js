import { get } from 'svelte/store';
import { writableChromeStorage } from '@common/js/store-utils';
import { isValidUrl, extractDomain } from '@common/js/string-utils';
import InvalidUrlError from '@common/js/InvalidUrlError';
import AllreadyExistsUrlError from '@common/js/AllreadyExistsUrlError';

/** @type {import('svelte/store').Writable<string[]>} */
const blacklist = writableChromeStorage('blacklist', []);
/** @type {import('svelte/store').Writable<import('@common/js/types').Interval[]>} */

const intervals = writableChromeStorage('intervals', []);

function addToBlacklist(url) {
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(`${url} is invalid`);
  }

  const found = isBlacklisted(url);

  if (found) {
    throw new AllreadyExistsUrlError(`${url} already exists`);
  }

  blacklist.update((arr) => [...arr, extractDomain(url)]);
}

function isBlacklisted(url) {
  const urlToFind = extractDomain(url);
  return get(blacklist)?.find((item) => item === urlToFind) != null;
}

export { blacklist, intervals, addToBlacklist, isBlacklisted };
