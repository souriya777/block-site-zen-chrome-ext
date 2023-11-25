import { get } from 'svelte/store';
import { blacklist } from '@common/js/store';
import { isValidUrl, extractDomain } from '@common/js/string-utils';
import InvalidUrlError from '@common/js/InvalidUrlError';
import AllreadyExistsUrlError from '@common/js/AllreadyExistsUrlError';

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

export { addToBlacklist, isBlacklisted };
