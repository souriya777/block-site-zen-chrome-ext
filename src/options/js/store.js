import { writable } from 'svelte/store';
import { writableLocalStorage } from '@options/js/store-utils';

/** @type {import('@options/js/types')} */
const blacklist = writableLocalStorage('blacklist', ['facebook.com', 'testa']);
const toto = writable('ça va bieng');

export { blacklist, toto };
