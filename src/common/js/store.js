import { get } from 'svelte/store';
import { writableChromeStorage } from '@common/js/store-utils';
import { isValidUrl, extractDomain } from '@common/js/string-utils';
import InvalidUrlError from '@common/js/InvalidUrlError';
import AllreadyExistsUrlError from '@common/js/AllreadyExistsUrlError';

const blacklist = writableChromeStorage('blacklist', [
  'google1.fr',
  'https://www.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/w.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
  'google1.fr',
  'https://www.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
  'google1.fr',
  'https://www.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
  'google1.fr',
  'https://www.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
  'google1.fr',
  'https://www.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
  'google1.fr',
  'https://www.facebook.com/events?source=46.fr',
  'google3.fr',
  'google4.fr',
  'google5.fr',
  'google6.fr',
  'tres-long-domain.fr',
  'google8.fr',
  'google9.fr',
  'google10.fr',
]);

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
