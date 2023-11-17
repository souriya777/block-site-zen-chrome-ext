import { get } from 'svelte/store';
import { writableChromeStorage } from '@common/js/store-utils';
import { isValidUrl, extractDomain } from '@common/js/string-utils';
import InvalidUrlError from '@common/js/InvalidUrlError';
import AllreadyExistsUrlError from '@common/js/AllreadyExistsUrlError';

const blacklist = writableChromeStorage('blacklist', []);

function addToBlacklist(url) {
  console.log('🔴', url, isValidUrl(url));
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

export { blacklist, addToBlacklist, isBlacklisted };
