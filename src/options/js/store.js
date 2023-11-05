import { writableLocalStorage } from '@options/js/store-utils';

/** @type {import('@options/js/types')} */
const blacklist = writableLocalStorage('blacklist', ['facebook.com', 'testa']);

export {
  blacklist,
};
